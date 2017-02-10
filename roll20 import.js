//todo look at using xpath for extraction
NodeList.forEach = Array.forEach;

var Views = {
    Dropzone: {
        charactersPane: '#journal > div[data-globalfolderid="-characters"]',
        setupDropzone: function ()
        {
            var dropbox;
            dropbox = document.querySelector(charactersPane);
            dropbox.addEventListener("dragenter", dragenter, false);
            dropbox.addEventListener("dragover", dragover, false);
            dropbox.addEventListener("drop", drop, false);
        }
    }
};

var languageLevels = {
    "Native": "3",
    "Accented": "2",
    "One-Way": "1.0",
    "Broken": "1",
    "None": "0"
};
var skillBases = {
    "ST": "@{strength}",
    "DX": "@{dexterity}",
    "IQ": "@{intelligence}",
    "HT": "@{health}",
    "Will": "@{willpower}",
    "Per": "@{perception}",
    "None": "10"
};
var skillDifficulties = {
    "-1": "E",
    "-2": "A",
    "-3": "H",
    "-4": "VH",
};
var damageTypes = {
    'cut': 'Cutting (cut)',
    'imp': 'Impaling (imp)',
    'cr': 'Crushing (cr)',
    'pi-': 'Small Piercing (pi-)',
    'pi': 'Piercing (pi)',
    'pi+': 'Large Piercing (pi+)',
    'pi++': 'Huge Piercing (pi++)',
    'aff': 'Affliction (aff)',
    'burn': 'Burning (burn)',
    'cor': 'Corrosion (cor)',
    'fat': 'Fatigue (fat)',
    'tox': 'Toxic (tox)',
    'spec': 'Special (spec)'
};
var char = {
    st: "",
    dx: "",
    iq: "",
    ht: "",
    will: "",
    per: "",
    vision: "",
    hearing: "",
    touch: "",
    smell: "",
    hp: "",
    fp: "",
    er: "",
    fright: "",
    speed: "",
    move: "",
    lift: "",
    dodge: "",
    advantages: [],
    disadvantages: [],
    racialTraits: [],
    skills: [],
    skullDR: 0,
    faceDR: 0,
    eyesDR: 0,
    neckDR: 0,
    armsDR: 0,
    handsDR: 0,
    torsoDR: 0,
    vitalsDR: 0,
    groinDR: 0,
    legsDR: 0,
    feetDR: 0
};
var parryTypes = {
    "0": "n/a",
    "F": "F",
    "U": "U",
    "No": "No",
    "-2": "-2",
    "-1": "-1",
    "+1": "+1",
    "+2": "+2",
    "-2U": "-2U",
    "-1U": "-1U",
    "-2F": "-2F",
    "-1F": "-1F",
    "other": "other"
};

//this will be the queue that manages all the button clicks and stuff so the logic doesn't get ahead of Firebase
var promise = new Promise(function (resolve, reject) { resolve(); });

var valueEndQuery = '</td>';

var exporter = (function ()
{
    function Constructor() { }
    Constructor.prototype.export = function (text)
    {
        return getChar(cleanText(text));
    }
    ;
    function getChar(text)
    {
        console.log("getChar");
        var returnMe = {};
        var identityString = getTable(text, "identity");
        var attributesString = getTable(text, "attributes");
        var advantagesString = getTable(text, "advantages");
        //console.log('advantagesString', advantagesString);
        var meleeWeaponsString = getTable(text, "melee_weapons");
        //console.log('meleeWeaponsString', meleeWeaponsString);
        var skillsString = getTable(text, "skills");
        var spellsString = getTable(text, "spells");
        var rangedWeaponsString = getTable(text, "ranged_weapons");
        var equipmentString = getTable(text, "equipment");
        var notesString = getTable(text, "notes");
        var hitLocationString = getTable(text, "hit_location");
        var liftingString = getTable(text, "lifting");
        var encumbranceMoveDodgeString = getTable(text, "encumbrance_move_dodge");
        var descriptionString = getTable(text, "description");
        returnMe.name = getName(identityString);
        returnMe.st = getAttributeValue(attributesString, 'Strength (ST):');
        returnMe.dx = getAttributeValue(attributesString, 'Dexterity (DX):');
        returnMe.iq = getAttributeValue(attributesString, 'Intelligence (IQ):');
        returnMe.ht = getAttributeValue(attributesString, 'Health (HT):');
        returnMe.will = getAttributeValue(attributesString, 'Will:');
        returnMe.fright = getAttributeValue(attributesString, 'Fright Check:');
        returnMe.speed = getAttributeValue(attributesString, 'Basic Speed:');
        returnMe.move = getAttributeValue(attributesString, 'Basic Move:');
        returnMe.per = getAttributeValue(attributesString, 'Perception:');
        returnMe.vision = getAttributeValue(attributesString, 'Vision:');
        returnMe.hearing = getAttributeValue(attributesString, 'Hearing:');
        returnMe.smell = getAttributeValue(attributesString, 'Taste &amp; Smell:');
        returnMe.touch = getAttributeValue(attributesString, 'Touch:');
        returnMe.thrust = getAttributeValue(attributesString, 'thr: </span>');
        returnMe.swing = getAttributeValue(attributesString, 'sw: </span>');
        returnMe.lift = Number(getAttributeValue(liftingString, 'Basic Lift:').split(" ")[0]);
        var re = RegExp(/<td class="title">Dodge<\/td>.*?<td class="rvalue">(\d*?)<\/td>\s*?<\/tr>/);
        var result = encumbranceMoveDodgeString.match(re);
        //console.log("result", result);
        //console.log("returnMe.lift", returnMe.lift);
        returnMe.dodge = result[1];
        var re2 = RegExp(/<td class="label">TL:<\/td>\s*?<td class="value">(\d*?)<\/td>/);
        returnMe.tl = descriptionString.match(re2)[1];
        returnMe.skullDR = getAttributeValue(hitLocationString, 'Skull');
        returnMe.faceDR = getAttributeValue(hitLocationString, 'Face');
        returnMe.eyesDR = getAttributeValue(hitLocationString, 'Eye');
        returnMe.neckDR = getAttributeValue(hitLocationString, 'Neck');
        returnMe.armsDR = getAttributeValue(hitLocationString, 'R. Arm');
        returnMe.handsDR = getAttributeValue(hitLocationString, 'Hand');
        returnMe.torsoDR = getAttributeValue(hitLocationString, 'Torso');
        returnMe.vitalsDR = getAttributeValue(hitLocationString, 'Vitals');
        returnMe.groinDR = getAttributeValue(hitLocationString, 'Groin');
        returnMe.legsDR = getAttributeValue(hitLocationString, 'R. Leg');
        returnMe.feetDR = getAttributeValue(hitLocationString, 'Foot');
        returnMe.advantages = getCollection(advantagesString, getAdvantageData)
        returnMe.skills = getCollection(skillsString, getSkillData)
        returnMe.spells = getCollection(spellsString, getSpellData)
        returnMe.meleeWeapons = getCollection(meleeWeaponsString, getMeleeWeaponData)
        returnMe.rangedWeapons = getCollection(rangedWeaponsString, getRangedWeaponData)
        returnMe.equipment = getCollection(equipmentString, getEquipmentData)
        returnMe.notes = getNotes(notesString);
        return returnMe;
    }
    function getAdvantageData(text)
    {
        console.log("getAdvantageData", text);
        var returnMe = {};
        //returnMe.name = getMatch(text, '<td class="description"  style="padding-left: 12px;" >', '(<div|' + valueEndQuery + ')') || "";
        returnMe.name = getMatch(text, '<td class="description" >', '(<div|' + valueEndQuery + ')') || "";
        returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
        returnMe.points = getMatch(text, '<td class="points">', valueEndQuery) || "";
        returnMe.ref = getMatch(text, '<td class="ref">', valueEndQuery) || "";
        returnMe.spoken = languageLevels[getMatch(returnMe.notes, "Spoken (", ")")] || null;
        returnMe.written = languageLevels[getMatch(returnMe.notes, "Written (", ")")] || null;
        if (returnMe.name !== "")
        {
            //console.log("getAdvantageData returning", returnMe);
            return returnMe;
        }
    }
    function getAttributeValue(text, query)
    {
        console.log("getAttributeValue", text, query);
        var searchMe = text.slice(text.indexOf(query));
        return getMatch(searchMe, '"rvalue">', valueEndQuery);
    }
    function getEquipmentData(text)
    {
        console.log("getEquipmentData");
        var returnMe = {};
        returnMe.name = getMatch(text, '<td class="description" >', '(<div|' + valueEndQuery + ')') || "";
        returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
        returnMe.state = getMatch(text, '<td class="state">', valueEndQuery) || "";
        returnMe.quantity = getMatch(text, '<td class="quantity">', valueEndQuery) || "";
        returnMe.cost = getMatch(text, '<td class="cost">', valueEndQuery) || "";
        returnMe.weight = getMatch(text, '<td class="weight">', valueEndQuery) || "";
        if (returnMe.name !== "")
        {
            return returnMe;
        }
    }
    function getMeleeWeaponData(text)
    {
        console.log("getMeleeWeaponData", text);
        var damageStrings;
        var returnMe = {};
        try
        {
            damageStrings = getMatch(text, '<td class="damage">', valueEndQuery).split(" ") || "";
        } catch (e)
        {
            damageStrings = ["", ""];
        }
        returnMe.block = getMatch(text, '<td class="block">', valueEndQuery) || "";
        returnMe.description = getMatch(text, '<td class="description">', valueEndQuery) || "";
        returnMe.level = getMatch(text, '<td class="level">', valueEndQuery) || "";
        returnMe.parry = getMatch(text, '<td class="parry">', valueEndQuery) || "";
        returnMe.reach = getMatch(text, '<td class="reach">', valueEndQuery) || "";
        returnMe.strength = getMatch(text, '<td class="strength">', valueEndQuery) || "";
        returnMe.usage = getMatch(text, '<td class="usage">', valueEndQuery) || "";
        returnMe.damage = damageStrings[0];
        returnMe.damageType = damageTypes[damageStrings[1]];
        //console.log("getMeleeWeaponData returning", returnMe);
        if (returnMe.usage !== "")
        {
            return returnMe;
        }
    }
    function getNotes(text)
    {
        console.log("getNotes", text);
        return getMatch(text, '<td class="description">', valueEndQuery);
    }
    function getName(text)
    {
        console.log("getName", text);
        var nameFieldQuery = '<td class="label">Name:</td>';
        var nameQuery = '<td class="value">';
        text.slice(text.indexOf(nameFieldQuery));
        return getMatch(text, nameQuery, valueEndQuery);
    }
    function getRangedWeaponData(text)
    {//throw Error("not implemented");
    }
    function getSkillData(text)
    {
        console.log("getSkillData", text);
        var returnMe = {};
        var rsl, nameTLSpecialty;

        try
        {
            nameTLSpecialty = getMatch(text, '<td class="description".+?>', '(<div|' + valueEndQuery + ')').split("/TL");
            rsl = getMatch(text, '<td class="relative_skill_level">', valueEndQuery).match('([a-zA-Z]+)([+-0123456789]+)');
            //console.log("rsl", rsl);
        }
        catch (e)
        {
            returnMe.name = null;
        }

        returnMe.points = getMatch(text, '<td class="points">', valueEndQuery) || "";

        if (rsl)
        {
            returnMe.attr = skillBases[rsl[1]];
            returnMe.difficulty = getSkillDifficulty(rsl[2], returnMe.points).toString();
        }

        if (nameTLSpecialty)
        {
            //console.log("nameTLSpecialty", nameTLSpecialty);

            var tlSpec;
            returnMe.name = nameTLSpecialty[0] || "";

            try
            {
                tlSpec = nameTLSpecialty[1].split("\(") || "";
                //console.log("tlSpec", tlSpec);
                returnMe.tl = tlSpec[0] || "";
                returnMe.specialty = tlSpec[1].split("\)")[0] || "";
            }
            catch (e)
            {
                returnMe.tl = "";
                returnMe.specialty = "";
            }
        }

        returnMe.ref = getMatch(text, '<td class="ref">', valueEndQuery) || "";
        returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
        returnMe.level = getMatch(text, '<td class="skill_level">', valueEndQuery) || "";

        if (returnMe.name)
        {
            //console.log("getSkillData returning", returnMe);
            return returnMe;
        }
    }
    function getSpellData(text)
    {
        console.log("getSpellData", text);

        var returnMe = {},
            name = "",
            rsl = "",
            castTimeDuration = "";

        try
        {
            name = getMatch(text, '<td class="description".+?>', '(<div|' + valueEndQuery + ')').split("/TL");
            castTimeDuration = getMatch(text, '<td class="time">', valueEndQuery).split('<div class="secondary">');
            rsl = getMatch(text, '<td class="relative_spell_level">', valueEndQuery).match('([a-zA-Z]+)([+-0123456789]+)');

            if (rsl)
            {
                returnMe.attr = skillBases[rsl[1]];
                returnMe.difficulty = getSkillDifficulty(rsl[2], returnMe.points).toString();
            }
            if (name)
            {
                returnMe.name = name[0] || "";
            }

            returnMe.points = getMatch(text, '<td class="points">', valueEndQuery) || "";
            returnMe.castTime = castTimeDuration[0];
            returnMe.duration = castTimeDuration[1];
            returnMe.cost = getMatch(text, '<td class="mana">', valueEndQuery) || "";
            returnMe.level = getMatch(text, '<td class="spell_level">', valueEndQuery) || "";
            returnMe.maintain = getMatch(text, '<td class="maintain">', valueEndQuery) || "";
            returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
            returnMe.ref = getMatch(text, '<td class="ref">', valueEndQuery) || "";
        }
        catch (e)
        {
            returnMe.name = null;
        }

        if (!returnMe.attr)
        {
            returnMe.attr = "IQ";
        }

        if (returnMe.name)
        {
            //console.log("getSkillData returning", returnMe);
            return returnMe;
        }
    }
    function getTable(text, name)
    {
        console.log("getTable", text, name);
        return getMatch(text, '<table id="' + name + '"', '</table>');
    }
    function getSkillDifficulty(rsl, points)
    {
        console.log('getSkillDifficulty', rsl, points);
        return Number(rsl) - calcSkillBonus(points);
    }
    function getCollection(text, callback)
    {
        console.log("getCollection", text, callback);
        var returnMe = [];
        var row = text.split('</tr>');
        row.forEach(function (column)
        {
            var result = callback(column);
            if (result)
            {
                returnMe.push(result);
            }
        });
        return returnMe;
    }

    /**
    Calculates the bonus that correlates to the number of points
    bonuses accrue at the following point values
    1
    2
    4
    8
    12
    16
    etc
    */
    function calcSkillBonus(points)
    {
        return Math.floor(points / 4) + Math.floor((points % 4) / 2) + (points % 2);
    }
    function cleanText(text)
    {
        console.log("cleanText", text);
        var returnMe = text.replace(/\r\n/, '').replace(/\t/, '').replace(/>\s+</, '><').replace("'", "\'");
        //console.log("cleanText returning", returnMe);
        return returnMe;
    }
    return {
        getInstance: function ()
        {
            return new Constructor();
        }
    };
})();

var sheetTypeOneImporter = (function ()
{
    var selectors = {
        acc: 'input[name="attr_acc"]',
        activeDefenses: '',
        add: 'button.repcontrol_add',
        advantages: 'div.sheet-traits',
        advantagesTab: 'input[name="attr_tab"][value="2"]',
        arms: 'input[name="attr_arms_dr_max"]',
        attr: 'select[name="attr_base"]',
        attributes: 'div.sheet-attribute',
        attributesAbilities: 'a[data-tab="attributesabilities"]',
        basicLift: 'input[name="attr_basic_lift_mod"]',
        bioInfo: 'div.bioinfo',
        bioInfoTab: 'a[data-tab="bioinfo"]',
        bonus: 'input[name="attr_bonus"]',
        bulk: 'input[name="attr_bulk"]',
        castTime: 'input[name="attr_castTime"]',
        charName: 'input.name[type="text"]',
        charSheet: 'a[data-tab="charsheet"]',
        combatTab: 'input[name="attr_tab"][value="4"]',
        cost: 'input[name="attr_cost"]',
        count: 'input[name="attr_count"]',
        damage: 'input[name="attr_damage"]',
        dexterity: 'input[name="attr_dexterity_mod"]',
        difficulty: 'select[name="attr_difficulty"]',
        disadvantages: 'div.sheet-disadvantages',
        dodge: 'input[name="attr_dodge_mod"]',
        duration: 'input[name="attr_duration"]',
        editButton: 'button.editcharacter',
        er: 'input[name="attr_energy_points_max"]',
        eyes: 'input[name="attr_eyes_dr_max"]',
        face: 'input[name="attr_face_dr_max"]',
        fear: 'input[name="attr_fear_check_mod"]',
        feet: 'input[name="attr_feet_dr_max"]',
        fp: 'input[name="attr_fatigue_points_max"]',
        generalTab: 'input[name="attr_tab"][value="1"]',
        grimoireTab: 'input[name="attr_tab"][value="6"]',
        groin: 'input[name="attr_groind_dr_max"]',
        hands: 'input[name="attr_hands_dr_max"]',
        health: 'input[name="attr_health_mod"]',
        hearing: 'input[name="attr_hearing_mod"]',
        hitLocations: 'div.sheet-damage-reduction',
        hp: 'input[name="attr_hit_points_max"]',
        inventoryTab: 'input[name="attr_tab"][value="5"]',
        iq: 'input[name="attr_intelligence_mod"]',
        items: 'div.sheet-items',
        languages: 'div.sheet-language',
        legs: 'input[name="attr_legs_dr_max"]',
        level: 'input[name="attr_level"]',
        maintain: 'input[name="attr_maintain"]',
        meleeAttacks: 'div.sheet-melee-attacks',
        miscellaneous: 'div.sheet-miscelleneous',
        move: 'input[name="attr_basic_move_mod"]',
        name: 'input[name="attr_name"]',
        neck: 'input[name="attr_neck_dr_max"]',
        notes: 'input[name="attr_notes"]',
        perception: 'input[name="attr_perception_mod"]',
        points: 'input[name="attr_points"]',
        racial: 'div.sheet-racial',
        range: 'input[name="attr_range"]',
        rangedAttacks: 'div.sheet-ranged-attacks',
        reach: 'input[name="attr_reach"]',
        recoil: 'input[name="attr_recoil"]',
        rof: 'input[name="attr_rof"]',
        row: 'div.repitem',
        shots: 'input[name="attr_shots"]',
        skill: 'input[name="attr_skill"]',
        skills: 'div.sheet-skills',
        skillsTab: 'input[name="attr_tab"][value="3"]',
        skull: 'input[name="attr_skull_dr_max"]',
        smell: 'input[name="attr_taste_smell_mod"]',
        speed: 'input[name="attr_basic_speed_mod"]',
        spells: 'div.sheet-spells:nth-of-type(2)',
        spoken: 'select[name="attr_spoken"]',
        strength: 'input[name="attr_strength_mod"]',
        tl: 'input[name="attr_tl"]',
        torso: 'input[name="attr_torso_dr_max"]',
        touch: 'input[name="attr_touch_mod"]',
        type: 'select[name="attr_type"]',
        vision: 'input[name="attr_vision_mod"]',
        vitals: 'input[name="attr_vitals_dr_max"]',
        weight: 'input[name="attr_weight"]',
        will: 'input[name="attr_willpower_mod"]',
        written: 'select[name="attr_written"]',
    };

    function Constructor()
    {
    }
    Constructor.prototype.import = function (char)
    {
        setupChar(char);
    };
    function setupChar(char)
    {
        console.log("setupChar");
        var callbacks = [];
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterAttributes(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterAdvantages(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterSkills(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterCombatStats(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterInventory(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterSpells(context, char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterName(context, char.name, callbacks);
            }, 200);
        });

        var context = getForegroundCharSheet();

        if (confirm("overwrite?"))
        {
            clearForm();
        }

        waitForDOM(context, selectors.generalTab, null, function ()
        {
            context.querySelector(selectors.charSheet).click();
            waitForDOM(context, selectors.generalTab, null, function ()
            {
                _execNextCallback(callbacks);
            });
        });
    }
    function getForegroundCharSheet()
    {
        //this gets every sheet that has been clicked, even if they are not visible, because they stay in markup
        var sheetsInMarkup = document.querySelectorAll("[data-characterid]");
        //console.log("sheets", sheetsInMarkup);
        var context = null;
        var highestZ = -1;

        sheetsInMarkup.forEach(function (sheet)
        {
            if ((sheet.currentStyle) && (sheet.currentStyle.display === "block") || (getComputedStyle(sheet, null).display === "block"))
            {
                var parent = sheet.parentElement;

                if (parent.style.zIndex > highestZ)
                {
                    //console.log("sheet.style.zIndex", parent.style.zIndex);
                    //console.log("highestZ", highestZ);

                    context = parent;
                    highestZ = parent.style.zIndex;
                }
            }
        });

        //console.log("getForegroundCharSheet returning", context);
        return context;
    }
    function clearForm()
    {
        var p = new Promise(
            function (resolve, reject)
            {
                resolve();
            }
        );

        p.then(
            function (val)
            {
                clearSection(selectors.advantages);
            }).then(
            function (val)
            {
                clearSection(selectors.disadvantages);
            }).then(
            function (val)
            {
                clearSection(selectors.languages);
            }).then(
            function (val)
            {
                clearSection(selectors.skills);
            }).then(
            function (val)
            {
                clearSection(selectors.meleeAttacks);
            }).then(
            function (val)
            {
                clearSection(selectors.rangedAttacks);
            }).then(
            function (val)
            {
                clearSection(selectors.items);
            }).then(
            function (val)
            {
                clearSection(selectors.spells);
            })

        .catch(
            function (reason)
            {
                //console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    function addRow(section, callback, item, callbacks)
    {
        console.log("addRow", 'callback', callback, 'item', item, 'section', section);
        var newRow = getNewRow(section);
        if (newRow)
        {
            callback(newRow, item);
            _execNextCallback(callbacks);
        }
    }
    function addRows(selector, section, callback, list, sectionCallbacks)
    {
        console.log("addRows", selector, section, callback, list);
        var rowCallbacks = [];
        var callbackList;
        var i;
        var target = section.querySelector(selectors.row);

        list.forEach(function (item)
        {
            rowCallbacks.push(function (callbacks)
            {
                addRow(section, callback, item, callbacks);
            });
        });

        callbackList = rowCallbacks.concat(sectionCallbacks);
        _execNextCallback(callbackList);
    }
    function enterAdvantage(target, advantage)
    {
        console.log("enterAdvantage", "target", target || "", "advantage", advantage);
        updateValue(target, selectors.name, advantage.name);
        updateValue(target, selectors.notes, advantage.notes);
        updateValue(target, selectors.points, advantage.points);
    }
    function enterAdvantages(context, char, callbacks)
    {
        console.log("enterAdvantages", 'char', char, 'callbacks', callbacks);
        context.querySelector(selectors.advantagesTab).click()
        callbacks.unshift(
            function (callbacks)
            {
                addRows(
                    selectors.languages,
                    context.querySelector(selectors.languages),
                    enterAdvantage,
                    char.advantages.filter(x=>x.spoken),
                    callbacks);
            },
            function (callbacks)
            {
                addRows(
                    selectors.disadvantages,
                    context.querySelector(selectors.disadvantages),
                    enterAdvantage,
                    char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) === "-"),
                    callbacks);
            },
            function (callbacks)
            {
                addRows(
                    selectors.advantages,
                    context.querySelector(selectors.advantages),
                    enterAdvantage,
                    char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) !== "-"),
                    callbacks);
            });
        waitForDOM(context, selectors.languages, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function enterAttributes(context, char, callbacks)
    {
        console.log("enterAttributes", context, char);
        var steve = context.querySelector(selectors.generalTab);//.click();
        //console.log("steve", steve);
        steve.click();
        waitForDOM(context, selectors.attributes, null, function ()
        {
            var updateContext = context.querySelector(selectors.attributes);
            //context.querySelector(selectors.er).value = char.er;
            //context.querySelector(selectors.er).value = char.er;
            //context.querySelector(selectors.fp).value = char.fp;
            //context.querySelector(selectors.fp).value = char.fp;
            //context.querySelector(selectors.hp).value = char.hp;
            //context.querySelector(selectors.hp).value = char.hp;
            updateValue(updateContext, selectors.basicLift, char.lift - 20);
            updateValue(updateContext, selectors.dexterity, char.dx - 10);
            updateValue(updateContext, selectors.dodge, char.dodge - 8);
            updateValue(updateContext, selectors.fear, char.fright - 10);
            updateValue(updateContext, selectors.health, char.ht - 10);
            updateValue(updateContext, selectors.hearing, char.hearing - 10);
            updateValue(updateContext, selectors.iq, char.iq - 10);
            updateValue(updateContext, selectors.move, char.move - 5);
            updateValue(updateContext, selectors.perception, char.per - 10);
            updateValue(updateContext, selectors.smell, char.smell - 10);
            updateValue(updateContext, selectors.speed, char.speed - 5);
            updateValue(updateContext, selectors.strength, char.st - 10);
            updateValue(updateContext, selectors.touch, char.touch - 10);
            updateValue(updateContext, selectors.vision, char.vision - 10);
            updateValue(updateContext, selectors.will, char.will - 10);
            updateValue(updateContext.querySelector(selectors.miscellaneous), selectors.tl, char.tl);
            _execNextCallback(callbacks);
        });
    }
    function enterCombatStats(context, char, callbacks)
    {
        console.log("enterCombatStats");
        context.querySelector(selectors.combatTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(selectors.meleeAttacks, context.querySelector(selectors.meleeAttacks), enterMeleeWeapon, char.meleeWeapons, callbacks);
        }, function (callbacks)
        {
            addRows(selectors.rangedAttacks, context.querySelector(selectors.rangedAttacks), enterRangedWeapon, char.rangedWeapons, callbacks);
        }, function (callbacks)
        {
            addRows(selectors.hitLocations, context.querySelector(selectors.hitLocations), enterHitLocations, char.rangedWeapons, callbacks);
        });
        waitForDOM(context, selectors.meleeAttacks, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function enterHitLocations(target, item)
    {
        console.log("enterRangedWeapon", target, item);
        updateValue(target, selectors.arms, item.armsDR);
        updateValue(target, selectors.eyes, item.eyesDR);
        updateValue(target, selectors.face, item.faceDR);
        updateValue(target, selectors.feet, item.feet);
        updateValue(target, selectors.groin, item.groinDR);
        updateValue(target, selectors.hands, item.hands);
        updateValue(target, selectors.legs, item.legsDR);
        updateValue(target, selectors.neck, item.neckDR);
        updateValue(target, selectors.skull, item.skullDR);
        updateValue(target, selectors.torso, item.torso);
        updateValue(target, selectors.vitals, item.vitalsDR);
    }
    function enterInventory(context, char, callbacks)
    {
        console.log("enterInventory");
        context.querySelector(selectors.inventoryTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(selectors.items, context.querySelector(selectors.items), enterItem, char.equipment, callbacks);
        });
        waitForDOM(context.querySelector(selectors.items), selectors.items, null, function ()
        {
            _execNextCallback(callbacks);
        })
    }
    function enterItem(target, item)
    {
        console.log("enterItem", target, item);
        updateValue(target, selectors.cost, item.cost);
        updateValue(target, selectors.count, item.quantity);
        updateValue(target, selectors.name, item.name);
        updateValue(target, selectors.weight, item.weight);
        updateValue(target, selectors.notes, item.notes);
    }
    function enterLanguage(target, language)
    {
        console.log("enterLanguage", target, language);
        //target.querySelector(selectors.row,char.placeholder);
        updateValue(target, selectors.name, language.name);
        updateValue(target, selectors.spoken, language.spoken);
        updateValue(target, selectors.written, language.written);
        //target.querySelector(selectors.add,char.placeholder);
        //target.querySelector(selectors.edit,char.placeholder);
    }
    function enterMeleeWeapon(target, item)
    {
        console.log("enterMeleeWeapon", target, item);
        updateValue(target, selectors.damage, item.damage);
        updateValue(target, selectors.name, item.usage);
        updateValue(target, selectors.reach, item.reach);
        updateValue(target, selectors.skill, item.level);
        updateValue(target, selectors.type, item.damageType);
    }
    function enterName(context, name)
    {
        context.querySelector(selectors.bioInfo).click();
        context.querySelector(selectors.editButton).click();

        var editContext = getForegroundCharSheet();
        waitForDOM(editContext, 'input.name', null, function ()
        {
            editContext.querySelector('input.name').value = name;
            editContext.querySelector('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only[type="button"][role="button"][aria-disabled="false"]').click();
        });
    }
    function enterRangedWeapon(target, item)
    {
        console.log("enterRangedWeapon", target, item);
        updateValue(target, selectors.acc, item.acc);
        updateValue(target, selectors.bulk, item.bulk);
        updateValue(target, selectors.damage, item.damage);
        updateValue(target, selectors.name, item.name);
        updateValue(target, selectors.range, item.range);
        updateValue(target, selectors.recoil, item.recoil);
        updateValue(target, selectors.rof, item.rof);
        updateValue(target, selectors.shots, item.shots);
        updateValue(target, selectors.skill, item.skill);
        updateValue(target, selectors.type, item.type);
    }
    function enterSkill(target, skill)
    {
        console.log("enterSkill", target, skill);
        updateValue(target, selectors.name, skill.name);
        updateValue(target, selectors.tl, skill.tl);
        updateValue(target, selectors.level, skill.level);
        updateValue(target, selectors.attr, skill.attr);
        updateValue(target, selectors.points, skill.points);
        updateValue(target, selectors.notes, skill.notes);
        updateValue(target, selectors.difficulty, skill.difficulty);
    }
    function enterSkills(context, char, callbacks)
    {
        context.querySelector(selectors.skillsTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(
                selectors.skills,
                context.querySelector(selectors.skills),
                enterSkill,
                char.skills,
                callbacks);
        });
        waitForDOM(context, selectors.skills, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function enterSpell(target, spell)
    {
        console.log("enterspell", target, spell);
        updateValue(target, selectors.name, spell.name);
        updateValue(target, selectors.notes, spell.notes);
        updateValue(target, selectors.difficulty, spell.difficulty);
        updateValue(target, selectors.points, spell.points);
        updateValue(target, selectors.castTime, spell.castTime);
        updateValue(target, selectors.duration, spell.duration);
        updateValue(target, selectors.cost, spell.cost);
        updateValue(target, selectors.maintain, spell.maintain);
        updateValue(target, selectors.ref, spell.ref);
    }
    function enterSpells(context, char, callbacks)
    {
        console.log("enterSpells", context, callbacks);

        context.querySelector(selectors.grimoireTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(
                selectors.spells,
                context.querySelector(selectors.spells),
                enterSpell,
                char.spells,
                callbacks);
        });
        waitForDOM(context, selectors.spells, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function _execNextCallback(callbacks)
    {
        console.log("_execNextCallback");
        if ((callbacks) && (callbacks.length > 0))
        {
            var newCallbacks = callbacks;
            var execMe = newCallbacks.shift();
            execMe(newCallbacks);
        }
    }
    function findEmptyRow(context, selector)
    {
        console.log("findEmptyRow", context, selector);
        var rows = context.querySelectorAll(selectors.row);
        //console.log("rows", rows);
        var i;
        var returnMe = null;
        //for (i = 0; i < rows.length; i++)
        rows.forEach(function (row)
        {
            var val = row.querySelector(selectors.name).value;
            if ((val === '') && (!returnMe))
            {
                //console.log("findEmptyRow returning", row);
                returnMe = row;
            }
        });
        return returnMe;
    }
    function getNewRow(context)
    {
        console.log("getNewRow", 'context', context);
        return waitForDOM(context, selectors.add, null, function ()
        {
            context.querySelector(selectors.add).click();
            return waitForDOM(context, selectors.row, findEmptyRow, function (result)
            {
                return result;
            });
        });
    }
    /**
    need to focus on the item to cause firebase to update
    */
    function updateValue(context, selector, value)
    {
        console.log("updateValue", "context", context, "selector", selector, "value", value)
        if (!context)
        {
            context = document;
        }
        var target = context.querySelector(selector);
        if (target)
        {
            target.click()
            target.focus();
            target.value = value;

            triggerEvent(target, 'change');
            triggerEvent(target, 'keydown');
            triggerEvent(target, 'keyup');
            triggerEvent(target, 'blur');
        }
    }
    function triggerEvent(target, eventName)
    {
        var event;
        // The custom event that will be created
        if (document.createEvent)
        {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else
        {
            event = document.createEventObject();
            event.eventType = eventName;
        }
        event.eventName = eventName;
        if (document.createEvent)
        {
            target.dispatchEvent(event);
        } else
        {
            target.fireEvent("on" + event.eventType, event);
        }
    }
    return {
        getInstance: function ()
        {
            return new Constructor();
        }
    };
})();

var sheetTypeTwoImporter = (function ()
{
    var selectors = {
        acc: 'input[name="attr_acc"]',
        add: 'button.repcontrol_add',
        advantages: '.sheet-traitpanel-top',
        age: 'input[name="attr_charinfo02_max"]',
        areaDRBack: 'input[name="attr_DR11_max"]',
        areaDRFront: 'input[name="attr_DR11"]',
        armorContext: '.sheet-mainlower-armorpanel',
        armsDRBack: 'input[name="attr_DR07_max"]',
        armsDRFront: 'input[name="attr_DR07"]',
        attributeContext: '.sheet-attributebox-attributes-panel',
        bioInfo: 'div.bioinfo',
        block: 'input[name="attr_Block01"]',
        bulk: 'input[name="attr_bulk"]',
        characterName: 'input[name="attr_character_name"]',
        characterTitle: 'input[name="attr_character_title"]',
        consumablesContext: 'body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable > div.dialog.characterdialog.ui-dialog-content.ui-widget-content > div > div > form > div > div.sheet-tab-content.sheet-tabPC > div.sheet-tab-content.sheet-tab4 > div > div:nth-child(3) > div',
        contactsContext: 'sheet-contacts-appear',
        controllingAttribute: 'input[name="attr_statscore"]',
        cost: 'input[name="attr_cost"]',
        damage: 'input[name="attr_damage"]',
        death: 'input[name="attr_Death"]',
        defenseBonus: 'input[name="attr_DB"]',
        defensesContext: '.sheet-attributebox-right-block',
        description: 'input[name="attr_desc"]',
        dexterity: 'input[name="attr_DX"]',
        disadvantages: '.sheet-traitpanel-top:nth-of-type(2)',
        dodge: 'input[name="attr_Dodge01"]',
        duration: 'input[name="attr_duration"]',
        editButton: 'button.editcharacter',
        energyReserve: 'input[name="attr_ER"]',
        eyeColor: 'input[name="attr_charinfo04_max"]',
        eyesDRBack: 'input[name="attr_DR01_max"]',
        eyesDRFront: 'input[name="attr_DR01"]',
        effect: 'input[name="attr_effect"]',
        faceDRBack: 'input[name="attr_DR04_max"]',
        faceDRFront: 'input[name="attr_DR04"]',
        fear: 'input[name="attr_Fear"]',
        feetDRBack: 'input[name="attr_DR10_max"]',
        feetDRFront: 'input[name="attr_DR10"]',
        fp: 'input[name="attr_FP"]',
        gender: 'input[name="attr_charinfo01_max"]',
        groinDRBack: 'input[name="attr_DR06_max"]',
        groinDRFront: 'input[name="attr_DR06"]',
        hairColor: 'input[name="attr_charinfo04"]',
        handedness: 'input[name="attr_charinfo02"]',
        handsDRBack: 'input[name="attr_DR08_max"]',
        handsDRFront: 'input[name="attr_DR08"]',
        health: 'input[name="attr_HT"]',
        hearing: 'input[name="attr_Hearing"]',
        height: 'input[name="attr_charinfo05"]',
        hp: 'input[name="attr_HP"]',
        intelligence: 'input[name="attr_IQ"]',
        inventoryTab: 'input[name="attr_ACTIVE_PC_TAB"][value="4"]',
        knockout: 'input[name="attr_KO"]',
        languageContext: '.sheet-variouspanel-appear',
        legsDRBack: 'input[name="attr_DR09_max"]',
        legsDRFront: 'input[name="attr_DR09"]',
        load: 'input[name="attr_BL"]',
        level: 'input[name="attr_level"]',
        mainTab: 'input[name="attr_ACTIVE_PC_TAB"][value="1"]',
        maxFp: 'input[name="attr_FP_max"]',
        maxHp: 'input[name="attr_HP_max"]',
        meleeWeapons: '.sheet-rightpanel-meleeweapons',
        move: 'input[name="attr_Move"]',
        name: 'input[name="attr_name"]',
        neckDRBack: 'input[name="attr_DR02_max"]',
        neckDRFront: 'input[name="attr_DR02"]',
        otherItemsContext: 'body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable > div.dialog.characterdialog.ui-dialog-content.ui-widget-content > div > div > form > div > div.sheet-tab-content.sheet-tabPC > div.sheet-tab-content.sheet-tab4 > div > div:nth-child(4) > div',
        parrySkill: 'input[name="attr_parryskill"]',
        parryType: 'input[name="attr_parrytype"]',
        perception: 'input[name="attr_Per"]',
        powersContext: '.sheet-spellpanel-top',
        powersTab: 'input[name="attr_ACTIVE_PC_TAB"][value="5"]',
        quantity: 'input[name="attr_qt"]',
        race: 'input[name="attr_charinfo01"]',
        range: 'input[name="attr_range"]',
        rangedWeapons: '.sheet-rightpanel-rangedweapons',
        reach: 'input[name="attr_reach"]',
        recoil: 'input[name="attr_recoil"]',
        ref: 'input[name="attr_ref"]',
        rof: 'input[name="attr_rof"]',
        row: 'div.repitem',
        shots: 'input[name="attr_shots"]',
        size: 'input[name="attr_charinfo03"]',
        skill: 'input[name="attr_skill"]',
        skillLevel: 'input[name="attr_level"]',
        skills: '.sheet-skillpanel-top',
        skillsContext: '.sheet-skillpanel-top',
        skillsTab: 'input[name="attr_ACTIVE_PC_TAB"][value="2"]',
        skinTone: 'input[name="attr_charinfocomplexion"]',
        skullDRBack: 'input[name="attr_DR03_max"]',
        skullDRFront: 'input[name="attr_DR03"]',
        smell: 'input[name="attr_Smell"]',
        speed: 'input[name="attr_Speed"]',
        spells: '.sheet-spellpanel-top',
        spoken: 'input[name="attr_spoken"]',
        strength: 'input[name="attr_ST"]',
        swingDamage: 'input[name="attr_DMG_base_max"]',
        taste: 'input[name="attr_Taste"]',
        techniques: '.sheet-skillpanel-bottom',
        thrustDamage: 'input[name="attr_DMG_base"]',
        tl: 'input[name="attr_tl"]',
        torsoDRBack: 'input[name="attr_DR05_max"]',
        torsoDRFront: 'input[name="attr_DR05"]',
        touch: 'input[name="attr_Touch"]',
        trained: 'input[name="attr_trained"]',
        traitsContext: '.sheet-traitpanel-top',
        traitsTab: 'input[name="attr_ACTIVE_PC_TAB"][value="3"]',
        type: 'input[name="attr_type"]',
        variousContext: '.sheet-variouspanel-desc',
        variousTab: 'input[name="attr_ACTIVE_PC_TAB"][value="6"]',
        vision: 'input[name="attr_Vision"]',
        weight: 'input[name="attr_charinfo03_max"]',
        weight: 'input[name="attr_wt"]',
        will: 'input[name="attr_Will"]',
        written: 'input[name="attr_written"]',
    };
    function Constructor() { }
    Constructor.prototype.import = function (char)
    {
        setupChar(char);
    };
    function setupChar(char)
    {
        console.log("setupChar");
        var callbacks = [];
        var context = getForegroundCharSheet();
        if (confirm("overwrite?"))
        {
            clearForm();
        }

        waitForDOM(context, selectors.mainTab, null, function ()
        {
            //console.log('setupChar part 2');
            context.querySelector(selectors.mainTab).click();
            waitForDOM(context, selectors.mainTab, null, function ()
            {
                promise.then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        main(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("main tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    skills(context, char);
                    return new Promise(function (resolve, reject)
                    {
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("skill tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        traits(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("traits tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        inventory(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("inventory tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        powers(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("power tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        various(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("various tab data entry resolving at ", Date.now());
                        }, 2000);
                    })
                }).then(function (val)
                {
                    return new Promise(function (resolve, reject)
                    {
                        enterName(context, char);
                        setTimeout(function ()
                        {
                            resolve();
                            console.log("name entry resolved at ", Date.now());
                        }, 2000);
                    })
                })

                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        main(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        skills(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        traits(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        inventory(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        powers(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        various(context, char, callbacks);
                //    }, 200);
                //});
                //callbacks.push(function (callbacks)
                //{
                //    setTimeout(function ()
                //    {
                //        enterName(context, char.name, callbacks);
                //    }, 200);
                //});

                //_execNextCallback(callbacks);
            });
        });
    }
    function getForegroundCharSheet()
    {
        //this gets every sheet that has been clicked, even if they are not visible, because they stay in markup
        var sheetsInMarkup = document.querySelectorAll("[data-characterid]");
        //console.log("sheets", sheetsInMarkup);
        var context = null;
        var highestZ = -1;

        sheetsInMarkup.forEach(function (sheet)
        {
            if ((sheet.currentStyle) && (sheet.currentStyle.display === "block") || (getComputedStyle(sheet, null).display === "block"))
            {
                var parent = sheet.parentElement;

                if (parent.style.zIndex > highestZ)
                {
                    //console.log("sheet.style.zIndex", parent.style.zIndex);
                    //console.log("highestZ", highestZ);

                    context = parent;
                    highestZ = parent.style.zIndex;
                }
            }
        });

        //console.log("getForegroundCharSheet returning", context);
        return context;
    }

    function clearForm()
    {
        promise.then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.mainTab, selectors.meleeWeapons);
                    clearSection(selectors.mainTab, selectors.rangedWeapons);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("main tab resolving at ", Date.now());
                    }, 2000);
                })
            }).then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.skillsTab, selectors.skillsContext);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("skills resolving at ", Date.now());
                    }, 2000);
                })
            }).then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.traitsTab, selectors.traitsContext);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("traits resolving at ", Date.now());
                    }, 2000);
                })
            }).then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.inventoryTab, selectors.consumablesContext);
                    clearSection(selectors.inventoryTab, selectors.otherItemsContext);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("inventory resolving at ", Date.now());
                    }, 2000);
                })
            }).then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.powersTab, selectors.powersContext);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("powers resolving at ", Date.now());
                    }, 2000);
                })
            }).then(
            function (val)
            {
                return new Promise(function (resolve, reject)
                {
                    clearSection(selectors.variousTab, selectors.languageContext);
                    setTimeout(function ()
                    {
                        resolve();
                        console.log("languages resolving at ", Date.now());
                    }, 2000);
                })
            })

        //.catch(
        //    function (reason)
        //    {
        //        console.log('Handle rejected promise (' + reason + ') here.');
        //    });
    }

    function addRow(section, callback, item)
    {
        console.log("addRow", 'callback', callback, 'item', item, 'section', section);
        var newRow = getNewRow(section);
        if (newRow)
        {
            callback(newRow, item);
        }
    }
    function addRows(selector, section, callback, list)
    {
        console.log("addRows", selector, section, callback, list);
        //var target = section.querySelector(selectors.row);

        list.forEach(function (item)
        {
            addRow(section, callback, item);
        });
    }
    function enterAdvantage(context, advantage)
    {
        console.log("enterAdvantage", "context", context || "", "advantage", advantage);
        updateValue(context, selectors.name, advantage.name);
        updateValue(context, selectors.description, advantage.notes);
        updateValue(context, selectors.ref, advantage.ref);
    }
    function enterHitLocations(context, char)
    {
        console.log("enterRangedWeapon", context);
        updateValue(context, selectors.armsDRBack, char.armsDR);
        updateValue(context, selectors.armsDRFront, char.armsDR);
        updateValue(context, selectors.eyesDRBack, char.eyesDR);
        updateValue(context, selectors.eyesDRFront, char.eyesDR);
        updateValue(context, selectors.faceDRBack, char.faceDR);
        updateValue(context, selectors.faceDRFront, char.faceDR);
        updateValue(context, selectors.feetDRBack, char.feet);
        updateValue(context, selectors.feetDRFront, char.feet);
        updateValue(context, selectors.groinDRBack, char.groinDR);
        updateValue(context, selectors.groinDRFront, char.groinDR);
        updateValue(context, selectors.handsDRBack, char.hands);
        updateValue(context, selectors.handsDRFront, char.hands);
        updateValue(context, selectors.legsDRBack, char.legsDR);
        updateValue(context, selectors.legsDRFront, char.legsDR);
        updateValue(context, selectors.neckDRBack, char.neckDR);
        updateValue(context, selectors.neckDRFront, char.neckDR);
        updateValue(context, selectors.skullDRBack, char.skullDR);
        updateValue(context, selectors.skullDRFront, char.skullDR);
        updateValue(context, selectors.torsoDRBack, char.torso);
        updateValue(context, selectors.torsoDRFront, char.torso);
    }
    function enterItem(context, item)
    {
        console.log("enterItem", context, item);
        updateValue(context, selectors.name, item.name);
        updateValue(context, selectors.ref, item.ref);
        updateValue(context, selectors.description, item.notes);
        updateValue(context, selectors.weight, item.weight);
        updateValue(context, selectors.quantity, item.quantity);
    }
    function enterLanguage(context, language)
    {
        console.log("enterLanguage", context, language);
        updateValue(context, selectors.name, language.name);
        updateValue(context, selectors.spoken, language.spoken);
        updateValue(context, selectors.written, language.written);
    }
    function enterMeleeWeapon(context, item)
    {
        console.log("enterMeleeWeapon", context, item);
        updateValue(context, selectors.damage, item.damage);
        updateValue(context, selectors.name, item.usage);
        updateValue(context, selectors.reach, item.reach);
        updateValue(context, selectors.skill, item.level);
        updateValue(context, selectors.type, item.damageType);
    }
    function enterName(context, name)
    {
        context.querySelector(selectors.bioInfo).click();
        context.querySelector(selectors.editButton).click();

        var editContext = getForegroundCharSheet();
        waitForDOM(editContext, 'input.name', null, function ()
        {
            editContext.querySelector('input.name').value = name;
            editContext.querySelector('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only[type="button"][role="button"][aria-disabled="false"]').click();
        });
    }
    function enterRangedWeapon(context, item)
    {
        console.log("enterRangedWeapon", context, item);
        updateValue(context, selectors.acc, item.acc);
        updateValue(context, selectors.bulk, item.bulk);
        updateValue(context, selectors.damage, item.damage);
        updateValue(context, selectors.name, item.name);
        updateValue(context, selectors.range, item.range);
        updateValue(context, selectors.recoil, item.recoil);
        updateValue(context, selectors.rof, item.rof);
        updateValue(context, selectors.shots, item.shots);
        updateValue(context, selectors.skill, item.skill);
        updateValue(context, selectors.type, item.type);
    }
    function enterSkill(context, skill)
    {
        console.log("enterSkill", context, skill);
        updateValue(context, selectors.name, skill.name);
        updateValue(context, selectors.description, skill.notes);
        updateValue(context, selectors.ref, skill.ref);
        updateValue(context, selectors.tl, skill.tl);
        updateValue(context, selectors.controllingAttribute, skill.attr);
        updateValue(context, selectors.level, skill.level - 10);
    }
    function enterTechnique(context, skill)
    {
        console.log("enterTechnique", context, skill);
        updateValue(context, selectors.name, skill.name);
        updateValue(context, selectors.notes, skill.notes);
        updateValue(context, selectors.ref, skill.ref);
        updateValue(context, selectors.controllingAttribute, skill.attr);
        updateValue(context, selectors.level, skill.level);
    }
    function enterSpell(context, spell)
    {
        console.log("enterspell", context, spell);
        updateValue(context, selectors.name, spell.name);
        updateValue(context, selectors.ref, spell.ref);
        updateValue(context, selectors.effect, "cast time:  " + spell.castTime + "   " + spell.notes);
        updateValue(context, selectors.duration, spell.duration);
        updateValue(context, selectors.cost, "cost:  " + spell.cost + "  maintain:  " + spell.maintain);
        updateValue(context, selectors.level, spell.level);
        updateValue(context, selectors.controllingAttribute, spell.attr);
    }
    function findEmptyRow(context, selector)
    {
        console.log("findEmptyRow", context, selector);
        var rows = context.querySelectorAll(selectors.row);
        //console.log("rows", rows);
        var i;
        var returnMe = null;
        //for (i = 0; i < rows.length; i++)
        rows.forEach(function (row)
        {
            var val = row.querySelector(selectors.name).value;
            if ((val === '') && (!returnMe))
            {
                //console.log("findEmptyRow returning", row);
                returnMe = row;
            }
        });
        return returnMe;
    }
    function getNewRow(context)
    {
        console.log("getNewRow", 'context', context);
        return waitForDOM(context, selectors.add, null, function ()
        {
            context.querySelector(selectors.add).click();
            return waitForDOM(context, selectors.row, findEmptyRow, function (result)
            {
                return result;
            });
        });
    }
    /**
    need to focus on the item to cause firebase to update
    */
    function inventory(context, char)
    {
        console.log("enterInventory", context, char);
        context.querySelector(selectors.inventoryTab).click()
        addRows(selectors.inventoryContext, context.querySelector(selectors.otherItemsContext), enterItem, char.equipment);
    }
    function main(context, char)
    {
        console.log("main", context, char);
        var steve = context.querySelector(selectors.mainTab);//.click();
        steve.click();
        waitForDOM(context, selectors.attributeContext, null, function ()
        {
            var attributeContext = context.querySelector(selectors.attributeContext);
            var defensesContext = context.querySelector(selectors.defensesContext);

            updateValue(defensesContext, selectors.block, char.block);
            updateValue(defensesContext, selectors.dodge, char.dodge);
            updateValue(defensesContext, selectors.load, char.lift);

            updateValue(attributeContext, selectors.death, char.death);
            updateValue(attributeContext, selectors.dexterity, char.dx);
            updateValue(attributeContext, selectors.energyReserve, char.energyReserve);
            updateValue(attributeContext, selectors.fear, char.fright);
            updateValue(attributeContext, selectors.fp, char.fp);
            updateValue(attributeContext, selectors.health, char.ht);
            updateValue(attributeContext, selectors.hearing, char.hearing);
            updateValue(attributeContext, selectors.hp, char.hp);
            updateValue(attributeContext, selectors.intelligence, char.iq);
            updateValue(attributeContext, selectors.knockout, char.ko);
            updateValue(attributeContext, selectors.maxFp, char.fp);
            updateValue(attributeContext, selectors.maxHp, char.hp);
            updateValue(attributeContext, selectors.move, char.move);
            updateValue(attributeContext, selectors.perception, char.per);
            updateValue(attributeContext, selectors.smell, char.smell);
            updateValue(attributeContext, selectors.speed, char.speed);
            updateValue(attributeContext, selectors.strength, char.st);
            updateValue(attributeContext, selectors.taste, char.taste);
            updateValue(attributeContext, selectors.touch, char.touch);
            updateValue(attributeContext, selectors.vision, char.vision);
            updateValue(attributeContext, selectors.will, char.will);

            enterHitLocations(context.querySelector(selectors.armorContext), char);
            addRows(selectors.meleeAttacks, context.querySelector(selectors.meleeWeapons), enterMeleeWeapon, char.meleeWeapons);
            addRows(selectors.rangedAttacks, context.querySelector(selectors.rangedWeapons), enterRangedWeapon, char.rangedWeapons);

            //updateValue(updateContext.querySelector(selectors.miscellaneous), selectors.tl, char.tl);
            //_execNextCallback(callbacks);
        });
    }
    function powers(context, char)
    {
        console.log("enterSpells", context);

        context.querySelector(selectors.powersTab).click()
        addRows(
            selectors.spells,
            context.querySelector(selectors.powersContext),
            enterSpell,
            char.spells);
    }
    function skills(context, char)
    {
        console.log("skills", 'context', context);
        context.querySelector(selectors.skillsTab).click()
        addRows(
            selectors.skills,
            context.querySelector(selectors.skillsContext),
            enterSkill,
            char.skills);
    }
    function traits(context, char)
    {
        console.log("traits", 'context', context);
        context.querySelector(selectors.traitsTab).click()
        addRows(
            selectors.disadvantages,
            context.querySelector(selectors.traitsContext),
            enterAdvantage,
            char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) === "-"));
        addRows(
            selectors.advantages,
            context.querySelector(selectors.traitsContext),
            enterAdvantage,
            char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) !== "-"));
    }
    function triggerEvent(target, eventName)
    {
        var event;
        // The custom event that will be created
        if (document.createEvent)
        {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else
        {
            event = document.createEventObject();
            event.eventType = eventName;
        }
        event.eventName = eventName;
        if (document.createEvent)
        {
            target.dispatchEvent(event);
        } else
        {
            target.fireEvent("on" + event.eventType, event);
        }
    }
    function updateValue(context, selector, value)
    {
        //console.log("updateValue", "context", context, "selector", selector, "value", value)
        if (!context)
        {
            context = document;
        }
        var target = context.querySelector(selector);
        if (target)
        {
            target.click()
            target.focus();
            target.value = value || "";

            triggerEvent(target, 'change');
            triggerEvent(target, 'keydown');
            triggerEvent(target, 'keyup');
            triggerEvent(target, 'blur');
        }
    }
    function various(context, char)
    {
        console.log("various", "context", context);
        //updateValue(context, selectors.race, char.);
        //updateValue(context, selectors.gender, char.);
        //updateValue(context, selectors.handedness, char.);
        //updateValue(context, selectors.title, char.);
        //updateValue(context, selectors.skinTone, char.);
        //updateValue(context, selectors.age, char.);
        //updateValue(context, selectors.size, char.);
        //updateValue(context, selectors.weight, char.);
        //updateValue(context, selectors.height, char.);
        //updateValue(context, selectors.hairColor, char.);
        //updateValue(context, selectors.eyeColor, char.);
        addRows(
            selectors.languages,
            context.querySelector(selectors.languageContext),
            enterLanguage,
            char.advantages.filter(x=>x.spoken));
        updateValue(context, selectors.characterName, char.name);
    }
    return {
        getInstance: function ()
        {
            return new Constructor();
        }
    };
})();

function clearSection(tab, selector)
{
    console.log("clearSection", tab, selector);
    var section = document.querySelector(selector);
    var editButton = section.querySelector('button.repcontrol_edit');
    var deleteButtons;
    console.log("section", section);
    console.log("editButton", editButton);

    try
    {
        document.querySelector(tab).click();
    }
    catch (e)
    {
        console.log("nothing to click");
    }

    editButton.click();
    waitForDOM(section, 'button.repcontrol_del', null, function ()
    {
        deleteButtons = section.querySelectorAll('button.repcontrol_del');
        deleteButtons.forEach(function (button)
        {
            button.click();
        });
        editButton.click();
    });
}
function getMatch(text, startQuery, endQuery)
{
    //console.log("getMatch", "text", text, "startQuery", startQuery, "endQuery", endQuery);
    try
    {
        var re = new RegExp(startQuery + "(.*?)" + endQuery);
        var returnMe = text.match(re);
        //console.log("getMatch returning", returnMe[1]);
        return returnMe ? returnMe[1] : null;
    } catch (e)
    {
        return null;
    }
}
function waitForDOM(context, selector, testCallback, doneCallback, endTime)
{
    //console.log('waitForDOM', 'context', context, 'selector', selector, 'testCallback', testCallback, 'doneCallback', doneCallback, 'endTime', endTime);
    var element = context.querySelector(selector);
    var testResult = null;
    if (!context)
    {
        context = document;
    }
    if (!testCallback)
    {
        testCallback = function (element)
        {
            return element ? true : false;
        }
    }
    if (!endTime)
    {
        endTime = new Date();
        endTime = endTime.setSeconds(endTime.getSeconds() + 15);
    }
    testResult = testCallback(context, selector, element);
    if (testResult)
    {
        return doneCallback(testResult);
    } else if (Date.now() <= endTime)
    {
        //console.log('delaying', 'now', Date.now(), 'end', endTime);
        setTimeout(function ()
        {
            return waitForDOM(context, selector, testCallback, doneCallback, endTime);
        }, 100);
    } else
    {
        //console.log('waitForDOM returning null');
        return null;
    }
}

var BlobHandler = (function ()
{
    // Instance stores a reference to the Singleton
    var instance;

    function init()
    {
        // Singleton
        // Private methods and variables
        function _blobConstructor()
        {
            var returnMe = false;
            var blob = new Blob();
            if ((window.Blob)
                || (blob))
            {
                returnMe = true;
            }
            return returnMe;
        }
        function _chromeFileRead()
        {
            var chosenFileEntry = null;

            chooseFileButton.addEventListener('click', function (e)
            {
                chrome.fileSystem.chooseEntry({ type: 'openFile' }, function (readOnlyEntry)
                {
                    readOnlyEntry.file(function (file)
                    {
                        var reader = new FileReader();

                        reader.onerror = errorHandler;
                        reader.onloadend = function (e)
                        {
                            console.log(e.target.result);
                        };

                        reader.readAsText(file);
                    });
                });
            });
        }
        function _chromeStorageSave(data)
        {
            chrome.fileSystem.getWritableEntry(chosenFileEntry, function (writableFileEntry)
            {
                writableFileEntry.createWriter(function (writer)
                {
                    writer.onerror = errorHandler;
                    writer.onwriteend = callback;

                    chosenFileEntry.file(function (file)
                    {
                        writer.write(file);
                    });
                }, errorHandler);
            });
        }
        function _chromeSupport()
        {
            if (chrome)
            {
                if (!chrome.fileSystem)
                {
                    console.log("The Chrome File System API is not supported");
                    return false;
                }

                return true;
            }
        }
        function _getBlob()
        {
            try
            {
                return new Blob([data], { type: 'application/json' });
            }
            catch (e)
            {
                // Old browser, need to use blob builder
                window.BlobBuilder = window.BlobBuilder
                    || window.WebKitBlobBuilder
                    || window.MozBlobBuilder
                    || window.MSBlobBuilder;

                if (window.BlobBuilder)
                {
                    var bb = new BlobBuilder();
                    bb.append(data);
                    return bb.getBlob("application/json");
                }
            }
        }
        function _handleFileReadAbort(evt)
        {
            alert("File read aborted.");
        }
        function _handleFileReadError(evt)
        {
            switch (evt.target.error.name)
            {
                case "NotFoundError":
                    alert("The file could not be found at the time the read was processed.");
                    break;
                case "SecurityError":
                    alert("A file security error occured.");
                    break;
                case "NotReadableError":
                    alert("The file cannot be read. This can occur if the file is open in another application.");
                    break;
                case "EncodingError":
                    alert("The length of the data URL for the file is too long.");
                    break;
                default:
                    alert("File error code " + evt.target.error.name);
            } // switch
        }
        function _html5WebStorageSave(data, name)
        {
            var that = this;
            var blob = that._getBlob();

            if (blob)
            {
                name = name || Math.round((new Date()).getTime() / 1000) + ".txt"; // Produces a unique file name every second.
                return window.navigator.msSaveOrOpenBlob(blob, name);
            }
            else
            {
                console.log("Save not supported");
                return false;
            }
        }
        function _msSaveOrOpenBlobSupported()
        {
            if (!window.navigator.msSaveOrOpenBlob)
            {
                // If msSaveOrOpenBlob() is supported, then so is msSaveBlob().
                //document.getElementsByTagName('body')[0].innerHTML = "<h1>The msSaveOrOpenBlob API is not supported</h1>";
                return false;
            }

            return true;
        }
        function _startFileRead(fileObject, handler)
        {
            var reader = new FileReader();

            // Set up asynchronous handlers for file-read-success, file-read-abort, and file-read-errors:
            reader.onloadend = handler; // "onloadend" fires when the file contents have been successfully loaded into memory.
            reader.abort = this._handleFileReadAbort; // "abort" files on abort.
            reader.onerror = this._handleFileReadError; // "onerror" fires if something goes awry.

            if (fileObject)
            {
                reader.readAsText(fileObject);
            }
            else
            {
                console.log("fileObject is null in _startFileRead().");
                return false;
            }
        }
        function _available()
        {
            return _blobConstructor() && _msSaveOrOpenBlobSupported();
        }

        //return _available() ? {
        return {
            // Public methods and variables
            //public
            saveFile: function (data)
            {
                console.log("Helper.saveFile");

                if (!!data)
                {
                    if (this.htmlBlobSupport())
                    {
                        this._html5WebStorageSave(data);
                    }
                    else if (this._chromeSupport())
                    {
                        // todo add Chrome stuff here
                    }
                }
                else
                {
                    alert("no data");
                }
            },
            handleFileSelection: function (files, handler)
            {
                if (!files)
                {
                    alert("The selected file is invalid - do not select a folder. Please reselect and try again.");
                    return;
                }

                // "files" is a FileList of file objects. Try to display the contents of the selected file:
                var file = files[0];
                // The way the <input> element is set up, the user cannot select multiple files.

                if (!file)
                {
                    alert("Unable to access " + file.name.toUpperCase() + "Please reselect and try again.");
                    return;
                }
                if (file.size === 0)
                {
                    alert("Unable to access " + file.name.toUpperCase() + " because it is empty. Please reselect and try again.");
                    return;
                }
                if (!file.type.match('text/.*'))
                {
                    alert("Unable to access " + file.name.toUpperCase() + " because it is not a known text file type. Please reselect and try again.");
                    return;
                }

                // Assert: we have a valid file.

                this._startFileRead(file, handler);
                //document.getElementById('hideWrapper').style.display = 'none'; // Remove the file picker dialog from the screen since we have a valid file.
            },
            loadFile: function (name, callback)
            {
                var blob = new Blob();
                // Now the user will have the option of clicking the Save button and the Open button.
                window.navigator.msSaveOrOpenBlob(blob, name);
                return callback(blob) || blob;
            },
            displayFileSelectDialogue: function (callback)
            {
                var self = this;
                var fileSelector = document.createElement('input');
                var selectDialogueLink = document.createElement('a');

                fileSelector.setAttribute('type', 'file');
                fileSelector.setAttribute('style', 'display:none');
                fileSelector.onchange = function (result)
                {
                    console.log('fileSelector.onchange result', result);
                    self.handleFileSelection(this.files, callback);
                };

                selectDialogueLink.setAttribute('href', '');
                selectDialogueLink.innerText = "Select File";
                selectDialogueLink.addEventListener("click", function () { }, false);

                document.body.appendChild(selectDialogueLink);
                selectDialogueLink.click();
                //todo return the blob?
            }

            //} : null;
        };
    };

    return {
        getInstance: function ()
        {
            if (!instance)
            {
                instance = init();
            }
            return instance;
        }
    };
})();
function drop(e)
{
    var blobHandler = BlobHandler.getInstance();
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    console.log("dt", dt);
    console.log("files", files);

    blobHandler.handleFileSelection(files);
}
(function ()
{
    console.log("starting import");
    var text = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!--***** BEGIN LICENSE BLOCK *****Copyright (c) 1998-2016 by Richard A. Wilkes. All rights reserved.This Source Code Form is subject to the terms of the Mozilla Public License,version 2.0. If a copy of the MPL was not distributed with this file, Youcan obtain one at http://mozilla.org/MPL/2.0/.This Source Code Form is "Incompatible With Secondary Licenses", as definedby the Mozilla Public License, version 2.0.***** END LICENSE BLOCK *****--><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /><title>Jeffrey Combs</title><style type="text/css" title="text/css">        /* <![CDATA[ */        body        {        color: black;        background-color: white;        font: normal 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;        margin: 4pt;        }                table, tbody, tr, td        {        margin: 0;        border-spacing: 0;        border-collapse: collapse;        font: normal 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;        }                table, tbody, tr { padding: 0; }                td        {        padding: 1pt 1pt 0 1pt;        vertical-align: top;        white-space: nowrap;        }                .note        {        font: normal 6pt/8pt \'Lucida Sans\',\'Arial\',sans-serif;        color: gray;        display: block-inline;        white-space: normal;        }                .secondary { display: block; }        .top_info { margin: 0; }        .list, .info { margin: 2pt 0 0 0; }                .list, .info, .top_info        {        width: 100%;        border: 1pt solid black;        }                #advantages { width: 270pt; }        #skills { width: 269pt; }        #spells, #melee_weapons, #ranged_weapons, #equipment, #notes, #copyright { width: 540pt; }                .list td { border: 1pt solid black; }        .odd { background-color: #FFF; }        .even { background-color: #E8FFE8; }        #encumbrance_move_dodge td, #hit_location td, #description td.label { border-left: 1pt solid black; }        #copyright {        color: gray;         font: italic 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;         text-align: center;         white-space: normal;         margin: 4pt;        }        .top_border { border-top: 1pt solid black; }                .title        {        border: 1pt solid black;        background-color: silver;        color: black;        text-align: center;        }                .description, .value, .rvalue, .natural_damage { width: 100%; }        .quantity, .cost, .weight, .cost_summary, .weight_summary, .ref, .level, .accuracy, .damage, .range, .rof, .shots, .bulk, .recoil, .strength, .block, .reach, .points, .spell_level, .relative_spell_level, .skill_level, .relative_skill_level, .rvalue { text-align: right; }        .state, .parry, .natural_damage { text-align: center; }                .wrapper        {        width: 540pt;        border: none;        }                .wrapper > tbody > tr > td { padding: 0; }        .spacer { width: 2pt; }        .rowspacer1 { padding: 1pt 0 0 0; }        .rowspacer2 { padding: 2pt 0 0 0; }        .rowspacer3 { padding: 3pt 0 0 0; }        .rowspacer4 { padding: 4pt 0 0 0; }        .rowspacer5 { padding: 5pt 0 0 0; }                .clabel { text-align: center; }        .label { text-align: right; }                .label, .clabel        {        color: gray;        background-color: inherit;        }                .encumbrance        {        background-color: #FCF2C4;        color: inherit;        }                #portrait        {        width: 60pt;        height: 80pt;        }                td.portrait { width: 60pt; }                td.portrait_cell        {        padding: 0;        background-color: black;        }                /* ]]> */</style></head><body><table class="wrapper"><tr><td class="portrait" rowspan="2"><table class="top_info"><tr><td class="title">Portrait</td></tr><tr><td class="portrait_cell"><img id="portrait" src="Jeffrey%20Combs.png" alt="Portrait"/></td></tr></table></td><td class="spacer" rowspan="2"></td><td><table id="identity" class="top_info"><tr><td class="title" colspan="2">Identity</td></tr><tr><td class="label">Name:</td><td class="value">Jeffrey Combs</td></tr><tr><td class="label">Title:</td><td class="value"></td></tr><tr><td class="label">Religion:</td><td class="value"></td></tr></table></td><td class="spacer"></td><td><table id="player_info" class="top_info"><tr><td class="title" colspan="2">Player Information</td></tr><tr><td class="label">Player:</td><td class="value"></td></tr><tr><td class="label">Campaign:</td><td class="value"></td></tr><tr><td class="label">Created On:</td><td class="value">Nov 7, 2183</td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="points" class="top_info"><tr><td class="title" colspan="2">230 Points</td></tr><tr><td class="label">Attributes:</td><td class="rvalue">105</td></tr><tr><td class="label">Advantages:</td><td class="rvalue">67</td></tr><tr><td class="label">Disadvantages:</td><td class="rvalue">-20</td></tr><tr><td class="label">Quirks:</td><td class="rvalue">0</td></tr><tr><td class="label">Skills:</td><td class="rvalue">30</td></tr><tr><td class="label">Spells:</td><td class="rvalue">48</td></tr><tr><td class="label">Race:</td><td class="rvalue">0</td></tr><tr><td class="rowspacer2" colspan="2"></td></tr><tr class="top_border"><td class="rowspacer1" colspan="2"></td></tr><tr><td class="label">Earned:</td><td class="rvalue">0</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr></table></td></tr><tr><td colspan="3"><table id="description" class="info"><tr><td class="title" colspan="6">Description</td></tr><tr><td class="label">Race:</td><td class="value"></td><td class="label">Height:</td><td class="value">0&quot;</td><td class="label">Hair:</td><td class="value"></td></tr><tr><td class="label">Gender:</td><td class="value"></td><td class="label">Weight:</td><td class="value">0 lb</td><td class="label">Eyes:</td><td class="value"></td></tr><tr><td class="label">Age:</td><td class="value">0</td><td class="label">Size:</td><td class="value">+0</td><td class="label">Skin:</td><td class="value"></td></tr><tr><td class="label">Birthday:</td><td class="value"></td><td class="label">TL:</td><td class="value">8</td><td class="label">Hand:</td><td class="value"></td></tr></table></td></tr></table><table class="wrapper"><tr><td rowspan="2"><table id="attributes" class="info"><tr><td class="title" colspan="2">Attributes</td></tr><tr><td class="label">Strength (ST):</td><td class="rvalue">10</td></tr><tr><td class="label">Dexterity (DX):</td><td class="rvalue">11</td></tr><tr><td class="label">Intelligence (IQ):</td><td class="rvalue">13</td></tr><tr><td class="label">Health (HT):</td><td class="rvalue">11</td></tr><tr class="top_border"><td class="label">Will:</td><td class="rvalue">16</td></tr><tr><td class="label">Fright Check:</td><td class="rvalue">16</td></tr><tr class="top_border"><td class="label">Basic Speed:</td><td class="rvalue">5.5</td></tr><tr><td class="label">Basic Move:</td><td class="rvalue">5</td></tr><tr class="top_border"><td class="label">Perception:</td><td class="rvalue">13</td></tr><tr><td class="label">Vision:</td><td class="rvalue">13</td></tr><tr><td class="label">Hearing:</td><td class="rvalue">13</td></tr><tr><td class="label">Taste &amp; Smell:</td><td class="rvalue">13</td></tr><tr><td class="label">Touch:</td><td class="rvalue">13</td></tr><tr class="top_border"><td class="natural_damage" colspan="2"><span class="label">thr: </span>1d-2<span class="label">, sw: </span>1d</td></tr><tr><td class="rowspacer2" colspan="2"></td></tr></table></td><td class="spacer" rowspan="2"></td><td><table id="encumbrance_move_dodge" class="info"><tr><td class="title" colspan="4">Encumbrance, Move &amp; Dodge</td></tr><tr><td class="title">Level</td><td class="title">Max Load</td><td class="title">Move</td><td class="title">Dodge</td></tr><tr  class="encumbrance" ><td class="label">&#8226; None (0)</td><td class="rvalue">20 lb</td><td class="rvalue">5</td><td class="rvalue">9</td></tr><tr ><td class="label">Light (1)</td><td class="rvalue">40 lb</td><td class="rvalue">4</td><td class="rvalue">8</td></tr><tr ><td class="label">Medium (2)</td><td class="rvalue">60 lb</td><td class="rvalue">3</td><td class="rvalue">7</td></tr><tr ><td class="label">Heavy (3)</td><td class="rvalue">120 lb</td><td class="rvalue">2</td><td class="rvalue">6</td></tr><tr ><td class="label">X-Heavy (4)</td><td class="rvalue">200 lb</td><td class="rvalue">1</td><td class="rvalue">5</td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="hit_location" class="info"><tr><td class="title" colspan="4">Hit Location</td></tr><tr><td class="title">Roll</td><td class="title">Where</td><td class="title">-</td><td class="title">DR</td></tr><tr><td class="clabel">-</td><td class="clabel">Eye</td><td class="label">-9</td><td class="rvalue">0</td></tr><tr><td class="clabel">3-4</td><td class="clabel">Skull</td><td class="label">-7</td><td class="rvalue">2</td></tr><tr><td class="clabel">5</td><td class="clabel">Face</td><td class="label">-5</td><td class="rvalue">0</td></tr><tr><td class="clabel">6-7</td><td class="clabel">R. Leg</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">8</td><td class="clabel">R. Arm</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">9-10</td><td class="clabel">Torso</td><td class="label">0</td><td class="rvalue">0</td></tr><tr><td class="clabel">11</td><td class="clabel">Groin</td><td class="label">-3</td><td class="rvalue">0</td></tr><tr><td class="clabel">12</td><td class="clabel">L. Arm</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">13-14</td><td class="clabel">L. Leg</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">15</td><td class="clabel">Hand</td><td class="label">-4</td><td class="rvalue">0</td></tr><tr><td class="clabel">16</td><td class="clabel">Foot</td><td class="label">-4</td><td class="rvalue">0</td></tr><tr><td class="clabel">17-18</td><td class="clabel">Neck</td><td class="label">-5</td><td class="rvalue">0</td></tr><tr><td class="clabel">-</td><td class="clabel">Vitals</td><td class="label">-3</td><td class="rvalue">0</td></tr><tr><td class="rowspacer4"></td><td class="rowspacer4"></td><td class="rowspacer4"></td><td class="rowspacer4"></td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="fp_hp" class="info"><tr><td class="title" colspan="2">Fatigue/Hit Points</td></tr><tr><td class="label">Current FP:</td><td class="rvalue"></td></tr><tr><td class="label">Basic FP:</td><td class="rvalue">11</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Tired:</td><td class="rvalue">3</td></tr><tr><td class="label">Collapse:</td><td class="rvalue">0</td></tr><tr><td class="label">Unconscious:</td><td class="rvalue">-11</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Current HP:</td><td class="rvalue"></td></tr><tr><td class="label">Basic HP:</td><td class="rvalue">10</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Reeling:</td><td class="rvalue">3</td></tr><tr><td class="label">Collapse:</td><td class="rvalue">0</td></tr><tr><td class="label">Check #1:</td><td class="rvalue">-10</td></tr><tr><td class="label">Check #2:</td><td class="rvalue">-20</td></tr><tr><td class="label">Check #3:</td><td class="rvalue">-30</td></tr><tr><td class="label">Check #4:</td><td class="rvalue">-40</td></tr><tr><td class="label">Dead:</td><td class="rvalue">-50</td></tr></table></td></tr><tr><td><table id="lifting" class="info"><tr><td class="title" colspan="2">Lifting &amp; Moving Things</td></tr><tr><td class="label">Basic Lift:</td><td class="rvalue">20 lb</td></tr><tr><td class="label">One-Handed Lift:</td><td class="rvalue">40 lb</td></tr><tr><td class="label">Two-Handed Lift:</td><td class="rvalue">160 lb</td></tr><tr><td class="label">Shove &amp; Knock Over:</td><td class="rvalue">240 lb</td></tr><tr><td class="label">Running Shove &amp; Knock Over:</td><td class="rvalue">480 lb</td></tr><tr><td class="label">Carry On Back:</td><td class="rvalue">300 lb</td></tr><tr><td class="label">Shift Slightly:</td><td class="rvalue">1,000 lb</td></tr></table></td></tr></table><table class="wrapper"><tr><td><table id="advantages" class="list"><tr><td class="title">Advantages &amp; Disadvantages</td><td class="title">Pts</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Extra Fatigue Points 10<div class="note">Magic Only (Subject to involuntary FP drain), -10%.</div></td><td class="points">27</td><td class="ref">B16</td></tr><tr class="even"><td class="description" >Language: English<div class="note">Spoken (Accented), +2; Written (Broken), +1.</div></td><td class="points">3</td><td class="ref">B24</td></tr><tr class="odd"><td class="description" >Language: Ia<div class="note">Spoken (Broken), +1; Written (Broken), +1.</div></td><td class="points">2</td><td class="ref">B24</td></tr><tr class="even"><td class="description" >Language: Spanish<div class="note">Native, -6; Spoken (Native), +3; Written (Native), +3.</div></td><td class="points">0</td><td class="ref">B24</td></tr><tr class="odd"><td class="description" >Loner<div class="note">CR: 12 (Resist Quite Often), -2 Reaction Penalty.</div><div class="note">You require a great deal of &#8220;personal space.&#8221; Make a self-control roll whenever anyone lingers nearby, watches  over your shoulder, etc. If you fail, you lash out at that person</div></td><td class="points">-5</td><td class="ref">B142</td></tr><tr class="even"><td class="description" >Magery 3</td><td class="points">35</td><td class="ref">B66</td></tr><tr class="odd"><td class="description" >Obsession<div class="note">Long term, -10.</div><div class="note">Bring Yog-Sothoth to my house for tea and biscuits.</div></td><td class="points">-10</td><td class="ref">B146</td></tr><tr class="even"><td class="description" >Pyrophobia (Fire)<div class="note">CR: 12 (Resist Quite Often).</div></td><td class="points">-5</td><td class="ref">B150</td></tr></table></td><td class="spacer"></td><td><table id="skills" class="list"><tr><td class="title">Skills</td><td class="title">SL</td><td class="title">RSL</td><td class="title">Pts</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Area Knowledge (Dunwich)</td><td class="skill_level">13</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B176</td></tr><tr class="even"><td class="description" >Breath Control</td><td class="skill_level">10</td><td class="relative_skill_level">HT-1</td><td class="points">2</td><td class="ref">B182</td></tr><tr class="odd"><td class="description" >Computer Operation/TL8</td><td class="skill_level">13</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B184</td></tr><tr class="even"><td class="description" >Dreaming</td><td class="skill_level">14</td><td class="relative_skill_level">Will-2</td><td class="points">1</td><td class="ref">B188</td></tr><tr class="odd"><td class="description" >Fast-Talk</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B195</td></tr><tr class="even"><td class="description" >Forced Entry</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B196</td></tr><tr class="odd"><td class="description" >Hidden Lore (Ia)</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B199</td></tr><tr class="even"><td class="description" >Holdout</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B200</td></tr><tr class="odd"><td class="description" >Interrogation</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B202</td></tr><tr class="even"><td class="description" >Knife</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B208</td></tr><tr class="odd"><td class="description" >Knot-Tying</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B203</td></tr><tr class="even"><td class="description" >Literature</td><td class="skill_level">11</td><td class="relative_skill_level">IQ-2</td><td class="points">1</td><td class="ref">B205</td></tr><tr class="odd"><td class="description" >Mathematics/TL8 (Applied)</td><td class="skill_level">11</td><td class="relative_skill_level">IQ-2</td><td class="points">1</td><td class="ref">B207</td></tr><tr class="even"><td class="description" >Meditation</td><td class="skill_level">14</td><td class="relative_skill_level">Will-2</td><td class="points">1</td><td class="ref">B207</td></tr><tr class="odd"><td class="description" >Occultism</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B212</td></tr><tr class="even"><td class="description" >Religious Ritual (Ia)<div class="note">Default: Ritual Magic (Ia) - 6</div></td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">2</td><td class="ref">B217</td></tr><tr class="odd"><td class="description" >Research/TL8<div class="note">Default: Writing - 3</div></td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B217</td></tr><tr class="even"><td class="description" >Ritual Magic (Ia)</td><td class="skill_level">11</td><td class="relative_skill_level">IQ-2</td><td class="points">2</td><td class="ref">B218</td></tr><tr class="odd"><td class="description" >Shadowing</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B219</td></tr><tr class="even"><td class="description" >Smuggling</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B221</td></tr><tr class="odd"><td class="description" >Stealth</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">2</td><td class="ref">B222</td></tr><tr class="even"><td class="description" >Survival (Jungle)</td><td class="skill_level">12</td><td class="relative_skill_level">Per-1</td><td class="points">1</td><td class="ref">B223</td></tr><tr class="odd"><td class="description" >Swimming</td><td class="skill_level">11</td><td class="relative_skill_level">HT+0</td><td class="points">1</td><td class="ref">B224</td></tr><tr class="even"><td class="description" >Symbol Drawing (Ia)</td><td class="skill_level">11</td><td class="relative_skill_level">IQ-2</td><td class="points">1</td><td class="ref">B224</td></tr><tr class="odd"><td class="description" >Thaumatology</td><td class="skill_level">13</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B225</td></tr><tr class="even"><td class="description" >Writing</td><td class="skill_level">12</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B228</td></tr></table></td></tr></table><table id="spells" class="list"><tr><td class="title">Spells</td><td class="title">Class</td><td class="title">Mana Cost</td><td class="title">Time</td><td class="title">SL</td><td class="title">RSL</td><td class="title">Pts</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Bind Servitor<div class="note">Call a supernatural creature to the caster, and  bind that creature to prevent him from harming the summoner in any way. Also compel the creature to obey one specific command of finite duration</div></td><td class="spell_class">Regular                <div class="secondary">Mythos</div></td><td class="mana">20                <div class="secondary"></div></td><td class="time">1 Minute                <div class="secondary">1 Day</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">4</td><td class="ref">M58</td></tr><tr class="even"><td class="description" >Borrow Language<div class="note">Caster gains a language at the subject&#8217;s comprehension level or Accented &#8211; whichever is less. The subject must know the language in question.</div></td><td class="spell_class">Regular                <div class="secondary">Communication</div></td><td class="mana">3                <div class="secondary">1</div></td><td class="time">3 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M46</td></tr><tr class="odd"><td class="description" >Call/Dismiss Yog-Sothoth<div class="note">Cause one of the Great Old Ones to manifest physically on planet Earth.  Base skill penalty is -20. However, this roll can be raised by 1 for every point of Fatigue invested in the casting. The caster can be assisted by a number of helpers, who may transfer one point of Fatigue to the caster through chanting. At the end of the ritual, whether or not it succeeds, the caster permanently loses one point of Will. He also makes a Fright Check at -10. If the ritual was correctly prepared and the skill roll was successful, the deity will appear. The caster and everybody else present must make a Fright Check appropriate to the deity in question.   The base roll to dismiss a called deity is -(10 + the deity\'s Fright Check modifier). Once again, this base score can be increased by 1 per Fatigue point spent, which can include Fatigue from helpers. </div></td><td class="spell_class">Regular                <div class="secondary">Mythos</div></td><td class="mana">Var                <div class="secondary"></div></td><td class="time">1 Minute/FP                <div class="secondary">Instant</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">4</td><td class="ref"></td></tr><tr class="even"><td class="description" >Clumsiness<div class="note">The subject suffers -1 to his DX and DX-based skills for every point of energy put into the spell</div></td><td class="spell_class">Regular                <div class="secondary">Body Control</div></td><td class="mana">1-5                <div class="secondary">Half</div></td><td class="time">1 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M36</td></tr><tr class="odd"><td class="description" >Compel Truth<div class="note">The subject becomes unable to lie, though he may keep silent or tell partial truths (this must be roleplayed). The spell does not force him to volunteer information; he merely cannot say anything he believes to be untrue.</div></td><td class="spell_class">Info                <div class="secondary">Communication</div></td><td class="mana">4                <div class="secondary">2</div></td><td class="time">1 sec                <div class="secondary">5 min</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M47</td></tr><tr class="even"><td class="description" >Control Gate<div class="note">Forces an open gate to close, a closed gate to open, or tilts and  displaces the subject gate as the caster wishes. Closing a permanent gate does not destroy it; closing a temporary one does (to destroy a permanent gate, use Remove Enchantment). This spell moves gates at up to 3 yards per second. Control Gate can also be used to &#8220;choose&#8221; a particular destination of a multiple-destination Gate (see Create Gate). Once control is relinquished, the Gate reverts to its &#8220;programmed&#8221; state, moving back to its original place at top speed and by the shortest path. If several Control Gate spells are active at once on a single Gate, the latter resists them with a single roll, control going to the spell with the largest margin of success</div></td><td class="spell_class">Regular                <div class="secondary">Gate</div></td><td class="mana">6                <div class="secondary">Half</div></td><td class="time">10 sec                <div class="secondary">1 min</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M85</td></tr><tr class="odd"><td class="description" >Control Zombie<div class="note">Take control of an undead creature raised with the Zombie spell by some other wizard. If the caster wins a Quick Contest of Spells with the original Zombie spell, the undead in question will obey the caster as if he had raised it. The Zombie spell resists at +2 if the original caster is within 100 yards, and at -2 if he is dead</div></td><td class="spell_class">Regular                <div class="secondary">Necromancy</div></td><td class="mana">3                <div class="secondary"></div></td><td class="time">1 sec                <div class="secondary">Permanent</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M152</td></tr><tr class="even"><td class="description" >Daze<div class="note">The subject looks and acts normal, but does not notice what is going on around him, or remember it later. Any injury, or successful resistance to a spell, causes the subject to snap out of the daze and return to full alert status</div></td><td class="spell_class">Regular                <div class="secondary">Mind Control</div></td><td class="mana">3                <div class="secondary">2</div></td><td class="time">2 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M134</td></tr><tr class="odd"><td class="description" >Death Vision<div class="note">The subject sees a vivid apparition of his own death. This might be a vision of the future or a false vision from another possible future &#8211; but it is always chilling. The subject is mentally stunned until he can make his IQ roll to shake off the effects of the spell. This spell can also be useful to the subject, by pointing out a possibly deadly hazard</div></td><td class="spell_class">Regular                <div class="secondary">Necromancy</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">3 sec                <div class="secondary">1 sec</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M149</td></tr><tr class="even"><td class="description" >Detect Magic<div class="note">Determines whether any one object is magical. If the spell is successful, a second casting tells whether the magic is temporary or permanent. </div></td><td class="spell_class">Regular                <div class="secondary">Knowledge</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">5 sec                <div class="secondary">Instant</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M101</td></tr><tr class="odd"><td class="description" >Fear<div class="note">The subject(s) feel fright. The caster receives a +3 bonus to reaction rolls in potential combat situations and other situations where threats are effective, but suffers a -3 penalty on loyalty rolls and situations where terrorizing NPCs is counterproductive.</div></td><td class="spell_class">Area                <div class="secondary">Mind Control</div></td><td class="mana">1                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">10 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M134</td></tr><tr class="even"><td class="description" >Foolishness<div class="note">The subject suffers -1 to his IQ and IQ-based skills (including spells) for every point of energy put into the spell. The GM may also require an IQ roll to remember complex things while under the influence of this spell.</div></td><td class="spell_class">Regular                <div class="secondary">Mind Control</div></td><td class="mana">1-5                <div class="secondary">Half</div></td><td class="time">1 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M134</td></tr><tr class="odd"><td class="description" >Identify Spell<div class="note">Identifies which spells have just been cast (within the last five seconds), or are being cast at the moment, on or by the subject. One casting identifies all spells cast on or by the subject. </div></td><td class="spell_class">Info                <div class="secondary">Knowledge</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M102</td></tr><tr class="even"><td class="description" >Itch<div class="note">Causes the subject to itch fiercely in a spot of the caster&#8217;s choice. The subject is at -2 DX until he takes one full second to scratch (more, if armor, etc. is in the way!). Only one Itch spell can affect a given subject at a time</div></td><td class="spell_class">Regular                <div class="secondary">Body Control</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Until scratched</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M35</td></tr><tr class="odd"><td class="description" >Lend Energy<div class="note">Restores the subject&#8217;s lost Fatigue Points, at an energy cost to the caster. Cannot increase the subject&#8217;s FP score above its normal maximum</div></td><td class="spell_class">Regular                <div class="secondary">Healing</div></td><td class="mana">1/pt                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Permanent</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M89</td></tr><tr class="even"><td class="description" >Lend Language<div class="note">Subject gains a language (sapient creatures only) at the caster&#8217;s comprehension level or Accented &#8211; whichever is less. The caster must know the language in question</div></td><td class="spell_class">Regular                <div class="secondary">Communication</div></td><td class="mana">3                <div class="secondary">1</div></td><td class="time">3 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M46</td></tr><tr class="odd"><td class="description" >Lend Vitality<div class="note">Temporarily restores the subject&#8217;s lost Hit Points, at an energy cost to the caster. Cannot increase the subject&#8217;s HP score above its normal maximum. Since restored HP vanish after one hour and the spell cannot be maintained, this spell is only a stopgap measure.</div></td><td class="spell_class">Regular                <div class="secondary">Healing</div></td><td class="mana">1/pt                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">1 hour</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M89</td></tr><tr class="even"><td class="description" >Mind-Reading<div class="note">Read a subject&#8217;s mind. Works on any living being, but is most useful on sapient creatures. Detects only surface thoughts (what the subject is thinking at that moment). This spell will not work on sleeping or unconscious subjects. The subject is not aware his mind is being read, except in the case of a critical failure</div></td><td class="spell_class">Regular                <div class="secondary">Communication</div></td><td class="mana">4                <div class="secondary">2</div></td><td class="time">10 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M46</td></tr><tr class="odd"><td class="description" >Paralyze Limb<div class="note">The caster must strike the subject on alimb to trigger this spell (hits elsewhere have no effect). Armor does not protect. Resolve resistance on contact. If the subject fails to resist, the subject&#8217;s limb is paralyzed; it is considered crippled for one minute</div></td><td class="spell_class">Melee                <div class="secondary">Body Control</div></td><td class="mana">3                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M40</td></tr><tr class="even"><td class="description" >Recover Energy<div class="note">Rest and recover Fatigue Points more quickly than normal by drawing energy from the mana around him. A normal person recovers 1 FP every 10 minutes. A mage who knows this spell at skill 15 or higher recovers 1 FP every 5 minutes. A mage who knows this spell at skill 20 or higher recovers 1 FP every 2 minutes. No further improvement is possible. Note that this spell works on the caster himself; it cannot restore FP to others. The mage must rest quietly, but no ritual or die roll is required. While resting, he can maintain ordinary spells, but not those that require  concentration. This spell does not function in lowor no-mana areas</div></td><td class="spell_class">Special                <div class="secondary">Healing</div></td><td class="mana">0                <div class="secondary">0</div></td><td class="time">1 sec                <div class="secondary">Special</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M89</td></tr><tr class="odd"><td class="description" >Seek Gate<div class="note">Tells the caster the direction and approximate distance of the nearest gate. Any known gates may be excluded if the caster specifically mentions them before beginning</div></td><td class="spell_class">Info                <div class="secondary">Gate</div></td><td class="mana">3                <div class="secondary">-</div></td><td class="time">10 sec                <div class="secondary">Instant</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M85</td></tr><tr class="even"><td class="description" >Seek Magic<div class="note">Determines the direction and approximate distance of the nearest significant magical item, active spell, or magical being (magical beings include demons, elementals, spirits, etc., but not races or individuals with Magery). Regular range penalties apply. Any known examples of magic may be excluded if the caster specifically mentions them before casting. This is also a Meta-Spell</div></td><td class="spell_class">Info                <div class="secondary">Knowledge</div></td><td class="mana">6                <div class="secondary">-</div></td><td class="time">10 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M102</td></tr><tr class="odd"><td class="description" >Sense Emotion<div class="note">Know what emotions the subject is feeling at the moment. It works on any living being, though it tends to be most useful on sapient beings. This will also tell how loyal the subject is to the  caster</div></td><td class="spell_class">Regular                <div class="secondary">Communication</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M45</td></tr><tr class="even"><td class="description" >Sense Foes<div class="note">Tells the caster if the subject has hostile intent, and what the degree of hostility is. Can be cast on one person or a whole area. If cast over an area, this spell will only detect that someone is hostile, without telling who</div></td><td class="spell_class">Info/Area                <div class="secondary">Communication</div></td><td class="mana">1/area, min 2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M44</td></tr><tr class="odd"><td class="description" >Sleep<div class="note">The subject falls asleep. If standing, he falls but this does not wake him. He can be awakened by a blow, loud noise, etc., but will be mentally stunned. </div></td><td class="spell_class">Regular                <div class="secondary">Mind Control</div></td><td class="mana">4                <div class="secondary">-</div></td><td class="time">3 sec                <div class="secondary">Until awakened</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M135</td></tr><tr class="even"><td class="description" >Spasm<div class="note">Can be directed against any of the subject&#8217;s voluntary muscles. Directed against a hand, it causes the subject to drop whatever he is holding (usually a weapon). If the subject is in the middle of a lengthy spell requiring gestures, he must make a DX roll or start over. Ingenious casters will find other uses</div></td><td class="spell_class">Regular                <div class="secondary">Body Control</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M35</td></tr><tr class="odd"><td class="description" >Summon Spirit<div class="note">Talk to the spirit of a dead person. The subject resists at -5 if he was a friend of the caster. If the spell succeeds, the subject will answer one question, to the best of his knowledge as of the time he died, and one more per minute he remains. </div></td><td class="spell_class">Info                <div class="secondary">Necromancy</div></td><td class="mana">20                <div class="secondary">10</div></td><td class="time">5 min                <div class="secondary">1 min</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M150</td></tr><tr class="even"><td class="description" >Total Paralysis<div class="note">The caster must touch the subject on the head (-5 to caster&#8217;s attack roll). If the subject fails to resist, he is totally paralyzed and cannot move at all for one minute (in the average game, until that battle is over).</div></td><td class="spell_class">Melee                <div class="secondary">Body Control</div></td><td class="mana">5                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">1 min</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M40</td></tr><tr class="odd"><td class="description" >Truthsayer<div class="note">Tells whether the subject is lying or not. May be cast in two ways: 1. To tell whether the subject has told anylies in the last five minutes. 2. To tell whether the last thing the subject said was a lie. May also give an indication of how great the lie is. If caster is not touching subject, calculate range as for a Regular spell</div></td><td class="spell_class">Info                <div class="secondary">Communication</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Instant</div></td><td class="spell_level">14</td><td class="relative_spell_level">IQ+1</td><td class="points">1</td><td class="ref">M45</td></tr><tr class="even"><td class="description" >Turn Zombie<div class="note">Inflicts 1d of injury on anything in the area that was animated using the Zombie spell; DR does not protect. In addition, roll 1d for each zombie. On a 1, it turns and flees from the caster</div></td><td class="spell_class">Area                <div class="secondary">Necromancy</div></td><td class="mana">2                <div class="secondary">-</div></td><td class="time">4 sec                <div class="secondary">Turned undead will avoid caster for 1 day</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M152</td></tr><tr class="odd"><td class="description" >Wither Limb<div class="note">The caster must strike the subject on alimb to trigger this spell (hits elsewhere have no effect). Armor does not protect. Resolve resistance on contact. If the caster wins, the subject&#8217;s limb withers immediately; it is crippled for all purposes (see Crippling Injury, p. B420). The subject also takes 1d damage</div></td><td class="spell_class">Melee                <div class="secondary">Body Control</div></td><td class="mana">5                <div class="secondary">-</div></td><td class="time">1 sec                <div class="secondary">Permanent</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M40</td></tr><tr class="even"><td class="description" >Zombie<div class="note">The subject of this spell must be a relatively complete dead body. The animated corpse becomes an undead servant of the caster. </div></td><td class="spell_class">Regular                <div class="secondary">Necromancy</div></td><td class="mana">8                <div class="secondary">-</div></td><td class="time">1 min                <div class="secondary">until destroyed</div></td><td class="spell_level">15</td><td class="relative_spell_level">IQ+2</td><td class="points">2</td><td class="ref">M151</td></tr></table><table id="melee_weapons" class="list"><tr><td class="title">Melee Weapons</td><td class="title">Usage</td><td class="title">Lvl</td><td class="title">Parry</td><td class="title">Block</td><td class="title">Damage</td><td class="title">Reach</td><td class="title">ST</td></tr><tr class="odd"><td class="description">Light Cloak</td><td class="usage"></td><td class="level">0</td><td class="parry">No</td><td class="block">0</td><td class="damage">-</td><td class="reach">-</td><td class="strength">-</td></tr><tr class="even"><td class="description">Natural</td><td class="usage">Kick</td><td class="level">9</td><td class="parry">No</td><td class="block"></td><td class="damage">1d-2 cr</td><td class="reach">C,1</td><td class="strength"></td></tr><tr class="odd"><td class="description">Natural</td><td class="usage">Kick w/Boots</td><td class="level">9</td><td class="parry">No</td><td class="block"></td><td class="damage">1d-1 cr</td><td class="reach">C,1</td><td class="strength"></td></tr><tr class="even"><td class="description">Natural</td><td class="usage">Punch</td><td class="level">11</td><td class="parry">9</td><td class="block"></td><td class="damage">1d-3 cr</td><td class="reach">C</td><td class="strength"></td></tr><tr class="odd"><td class="description">Small Knife</td><td class="usage">Swung</td><td class="level">11</td><td class="parry">8</td><td class="block">No</td><td class="damage">1d-3 cut</td><td class="reach">C,1</td><td class="strength">5</td></tr><tr class="even"><td class="description">Small Knife</td><td class="usage">Thrust</td><td class="level">11</td><td class="parry">8</td><td class="block">No</td><td class="damage">1d-3 imp</td><td class="reach">C</td><td class="strength">5</td></tr><tr class="odd"><td class="description">Total Paralysis<div class="note">The caster must touch the subject on the head (-5 to caster&#8217;s attack roll). If the subject fails to resist, he is totally paralyzed and cannot move at all for one minute (in the average game, until that battle is over).</div></td><td class="usage">Punch</td><td class="level">11</td><td class="parry">9</td><td class="block"></td><td class="damage">1d-3 cr + Paralysis</td><td class="reach">C</td><td class="strength"></td></tr><tr class="even"><td class="description">Wither Limb<div class="note">The caster must strike the subject on alimb to trigger this spell (hits elsewhere have no effect). Armor does not protect. Resolve resistance on contact. If the caster wins, the subject&#8217;s limb withers immediately; it is crippled for all purposes (see Crippling Injury, p. B420). The subject also takes 1d damage</div></td><td class="usage">Punch</td><td class="level">11</td><td class="parry">9</td><td class="block"></td><td class="damage">1d-3 cr +1d</td><td class="reach">C</td><td class="strength"></td></tr></table><table id="ranged_weapons" class="list"><tr><td class="title">Ranged Weapons</td><td class="title">Usage</td><td class="title">Lvl</td><td class="title">Acc</td><td class="title">Damage</td><td class="title">Range</td><td class="title">RoF</td><td class="title">Shots</td><td class="title">Bulk</td><td class="title">Rcl</td><td class="title">ST</td></tr><tr class="odd"><td class="description">Light Cloak</td><td class="usage">Thrown</td><td class="level">6</td><td class="accuracy">+1</td><td class="damage">Special</td><td class="range">2</td><td class="rof">1</td><td class="shots">T(1)</td><td class="bulk">-4</td><td class="recoil"></td><td class="strength">5</td></tr><tr class="even"><td class="description">Small Knife</td><td class="usage">Thrown</td><td class="level">7</td><td class="accuracy">+0</td><td class="damage">1d-3 imp</td><td class="range">5/10</td><td class="rof">1</td><td class="shots">T(1)</td><td class="bulk">-1</td><td class="recoil"></td><td class="strength">5</td></tr></table><table id="equipment" class="list"><tr><td class="title">Equipment (6.508 lb; $230)</td><td class="title">&radic;</td><td class="title">#</td><td class="title">$</td><td class="title">W</td><td class="title">&sum; $</td><td class="title">&sum; W</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Small Knife</td><td class="state">E</td><td class="quantity">1</td><td class="cost">30</td><td class="weight">0.5 lb</td><td class="cost_summary">30</td><td class="weight_summary">0.5 lb</td><td class="ref">B272</td></tr><tr class="even"><td class="description" >Light Cloak</td><td class="state">E</td><td class="quantity">1</td><td class="cost">20</td><td class="weight">2 lb</td><td class="cost_summary">20</td><td class="weight_summary">2 lb</td><td class="ref">B287</td></tr><tr class="odd"><td class="description" >Gold Coin (Elder Sign)<div class="note">Prevents passage of servitors.</div></td><td class="state">E</td><td class="quantity">1</td><td class="cost">80</td><td class="weight">0.004 lb</td><td class="cost_summary">80</td><td class="weight_summary">0.004 lb</td><td class="ref">B264</td></tr><tr class="even"><td class="description" >Gold Coin (Yellow Sign)<div class="note">Zenders the holder vulnerable to mind altering magic. </div></td><td class="state">E</td><td class="quantity">1</td><td class="cost">80</td><td class="weight">0.004 lb</td><td class="cost_summary">80</td><td class="weight_summary">0.004 lb</td><td class="ref">B264</td></tr><tr class="odd"><td class="description" >Effigy of Binding<div class="note">This will prevent the target from harming you for a day.  One use only.  Requires target\'s DNA.</div></td><td class="state">C</td><td class="quantity">1</td><td class="cost">0</td><td class="weight">1 lb</td><td class="cost_summary">0</td><td class="weight_summary">1 lb</td><td class="ref">B264</td></tr><tr class="even"><td class="description" >SpellBook<div class="note">This looks rather suspicious, but it is necessary for spellcasting.</div></td><td class="state">C</td><td class="quantity">1</td><td class="cost">0</td><td class="weight">1 lb</td><td class="cost_summary">0</td><td class="weight_summary">1 lb</td><td class="ref">B264</td></tr><tr class="odd"><td class="description" >Vial of Dark Water<div class="note">Destroys the target.  </div></td><td class="state">E</td><td class="quantity">1</td><td class="cost">10</td><td class="weight">1 lb</td><td class="cost_summary">10</td><td class="weight_summary">1 lb</td><td class="ref">B288</td></tr><tr class="even"><td class="description" >Vial of Yig\'s Blood<div class="note">Regenerates the consumer, healing all wounds and giving a reptilian appearance.</div></td><td class="state">E</td><td class="quantity">1</td><td class="cost">10</td><td class="weight">1 lb</td><td class="cost_summary">10</td><td class="weight_summary">1 lb</td><td class="ref">B288</td></tr></table><table id="notes" class="list"><tr><td class="title">Notes</td></tr><tr><td class="description">The stars are aligning.  Yog-Sothoth has turned his gaze upon the Earth.  Gates will appear.  Open one, and Yog-Sothoth will cross the threshold.  <br><br>Goal:  Find the Gate, Open it, Call Yog-Sothoth, receive your reward (be Yog-Sothoth food).<br>To open a gate, stand near it and cast Control Gate.<br><br>Bonus: Get the other players to lend you FP to fuel your Control Gate spell.<br></td></tr></table><div id="copyright">Modified at 11:05 PM on Jan 22, 2017.<br>GURPS Character Sheet is copyright &copy;1998-2016 by Richard A. Wilkes &mdash; All rights reserved worldwide.<br>Licensed for your use under Mozilla Public License, version 2.0</div></body></html>';
    var e = exporter.getInstance();
    var i = sheetTypeOneImporter.getInstance();
    var j = sheetTypeTwoImporter.getInstance();

    //blobHandler.displayFileSelectDialogue(function (file)
    //{
    //    text = file;
    //    console.log('text from file', text);
    //});

    setTimeout(function ()
    {
        char = e.export(text);
        //i.import(char);
        j.import(char);
    }, 1000);
})();