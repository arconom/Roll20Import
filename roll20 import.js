//todo look at using xpath for extraction
NodeList.forEach = Array.forEach;

//dropdown options
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
	"E":"-1"
	, "A":"-2"
	, "H":"-3"
	, "VH":"-4"
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
var promise = new Promise(function (resolve, reject) {
		resolve();
	});

//this takes the data from the source and transforms it into something usable
var GCSDataTransformController = (function () {
	function Constructor() {}
	Constructor.prototype.export = function (text) {
		console.log("before regex", text);
		console.log("after regex", text.replace(/([\}\"]),(\s*[\}\]])/g, "$1$2"));

		return JSON.parse(text.replace(/([\}\"]),(\s*[\}\]])/g, "$1$2"));
	};
	return {
		getInstance: function () {
			return new Constructor();
		}
	};
})();

var sheetTypeOneController = (function () {
	var selectors = {
		acc: 'input[name="attr_acc"]',
		//activeDefenses: '',
		generalTab: '.sheet-tab1',
		traitsTab: '.sheet-tab2',
		skillsTab: '.sheet-tab3',
		combatTab: '.sheet-tab4',
		wealthTab: '.sheet-tab5',
		grimoireTab: '.sheet-tab6',
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
		characterSheetContext: 'div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable',
	};

	function Constructor() {}
	Constructor.prototype.import = function (char) {
		setupChar(char);
	};
	function setupChar(char) {
		console.log("setupChar");

		waitForDOM(document, selectors.characterSheetContext, null, function () {
			setTimeout(function () {
				var context = getForegroundCharSheet();

				waitForDOM(context, selectors.charSheet, null, function () {
					context.querySelector(selectors.charSheet).click();

					setTimeout(function () {
						// if (confirm("overwrite?")) {
							// clearForm();
						// }

						waitForDOM(context, selectors.generalTab, null, function () {
							waitForDOM(context, selectors.generalTab, null, function () {
								promise.then(function (val) {
									enterAttributes(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterAdvantages(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterSkills(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterCombatStats(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterInventory(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterSpells(context, char);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function (val) {
									enterName(context, char.identity.name);
									return new Promise(function (resolve, reject) {
										setTimeout(function () {
											resolve();
										}, 2000);
									})
								}).then(function () {
									alert("finished");
								});
							});
						});
					}, 1000);
				});
			}, 500);
		});
	}
	function clearForm() {
		promise.then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.traitsTab, selectors.advantages);
				clearSection(selectors.traitsTab, selectors.disadvantages);
				clearSection(selectors.traitsTab, selectors.languages);
				setTimeout(function () {
					resolve();
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.skillsTab, selectors.skills);
				setTimeout(function () {
					resolve();
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.combatTab, selectors.meleeAttacks);
				clearSection(selectors.combatTab, selectors.rangedAttacks);
				setTimeout(function () {
					resolve();
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.wealthTab, selectors.items);
				setTimeout(function () {
					resolve();
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.grimoireTab, selectors.spells);
				setTimeout(function () {
					resolve();
				}, 2000);
			})
		});

		//.catch(
		//    function (reason)
		//    {
		//        //console.log('Handle rejected promise (' + reason + ') here.');
		//    });
	}

	//function addRow(section, callback, item)
	//{
	//    console.log("addRow", 'callback', callback, 'item', item, 'section', section);
	//    var newRow = getNewRow(section);
	//    if (newRow)
	//    {
	//        callback(newRow, item);
	//    }
	//}
	//function addRows(selector, section, callback, list)
	//{
	//    console.log("addRows", selector, section, callback, list);
	//    var rowCallbacks = [];
	//    var callbackList;
	//    var i;
	//    var target = section.querySelector(selectors.row);
	//
	//    list.forEach(function (item)
	//    {
	//        rowCallbacks.push(function (callbacks)
	//        {
	//            addRow(section, callback, item);
	//        });
	//    });
	//
	//    callbackList = rowCallbacks.concat(sectionCallbacks);
	//    _execNextCallback(callbackList);
	//}
	function enterAdvantage(target, advantage) {
		console.log("enterAdvantage", "target", target, "advantage", advantage);
		updateValue(target, selectors.name, advantage.name);
		updateValue(target, selectors.notes, advantage.description);
		updateValue(target, selectors.points, advantage.points);
	}
	function enterAdvantages(context, char) {
		console.log("enterAdvantages", 'char', char);
		context.querySelector(selectors.advantagesTab).click()

		waitForDOM(context, selectors.languages, null, function () {
			addRows(
				selectors.languages,
				context.querySelector(selectors.languages),
				enterAdvantage,
				char.traits.filter(x => x.spoken));
			addRows(
				selectors.disadvantages,
				context.querySelector(selectors.disadvantages),
				enterAdvantage,
				char.traits.filter(x => !x.spoken && x.points.slice(0, 1) === "-"));
			addRows(
				selectors.advantages,
				context.querySelector(selectors.advantages),
				enterAdvantage,
				char.traits.filter(x => !x.spoken && x.points.slice(0, 1) !== "-"));
		});
	}
	function enterAttributes(context, char) {
		console.log("enterAttributes", context, char);
		context.querySelector(selectors.generalTab).click();

		waitForDOM(context, selectors.attributes, null, function () {
			var updateContext = context.querySelector(selectors.attributes);
			// updateValue(updateContext, selectors.basicLift, char.lift - 20);
			updateValue(updateContext, selectors.dexterity, char.stats.primary.dx - 10);
			updateValue(updateContext, selectors.dodge, char.encumbrance[0].dodge - 8);
			updateValue(updateContext, selectors.fear, char.stats.secondary.frightCheck - 10);
			updateValue(updateContext, selectors.health, char.stats.primary.ht - 10);
			updateValue(updateContext, selectors.hearing, char.stats.senses.hearing - 10);
			updateValue(updateContext, selectors.iq, char.stats.primary.iq - 10);
			updateValue(updateContext, selectors.move, char.stats.secondary.basicMove - 5);
			updateValue(updateContext, selectors.perception, char.stats.secondary.perception - 10);
			updateValue(updateContext, selectors.smell, char.stats.senses.smell - 10);
			updateValue(updateContext, selectors.speed, char.stats.secondary.basicSpeed - 5);
			updateValue(updateContext, selectors.strength, char.stats.primary.st - 10);
			updateValue(updateContext, selectors.touch, char.stats.senses.touch - 10);
			updateValue(updateContext, selectors.vision, char.stats.senses.vision - 10);
			updateValue(updateContext, selectors.will, char.stats.secondary.will - 10);
			updateValue(updateContext.querySelector(selectors.miscellaneous), selectors.tl, char.identity.tl);
		});
	}
	function enterCombatStats(context, char) {
		console.log("enterCombatStats");
		context.querySelector(selectors.combatTab).click()

		waitForDOM(context, selectors.meleeAttacks, null, function () {
			addRows(selectors.meleeAttacks, context.querySelector(selectors.meleeAttacks), enterMeleeWeapon, char.attacks.melee);
			addRows(selectors.rangedAttacks, context.querySelector(selectors.rangedAttacks), enterRangedWeapon, char.attacks.ranged);
			enterHitLocations(context, char);
		});
	}
	function enterHitLocations(target, item) {
		console.log("enterHitLocations", target, item);

		updateValue(target, selectors.arms, item.hitLocations.filter(x => x.name.indexOf("arms") > -1));
		updateValue(target, selectors.eyes, item.hitLocations.filter(x => x.name.indexOf("eyes") > -1));
		updateValue(target, selectors.face, item.hitLocations.filter(x => x.name.indexOf("face") > -1));
		updateValue(target, selectors.feet, item.hitLocations.filter(x => x.name.indexOf("feet") > -1));
		updateValue(target, selectors.groin, item.hitLocations.filter(x => x.name.indexOf("groin") > -1));
		updateValue(target, selectors.hands, item.hitLocations.filter(x => x.name.indexOf("hands") > -1));
		updateValue(target, selectors.legs, item.hitLocations.filter(x => x.name.indexOf("legs") > -1));
		updateValue(target, selectors.neck, item.hitLocations.filter(x => x.name.indexOf("neck") > -1));
		updateValue(target, selectors.skull, item.hitLocations.filter(x => x.name.indexOf("skull") > -1));
		updateValue(target, selectors.torso, item.hitLocations.filter(x => x.name.indexOf("torso") > -1));
		updateValue(target, selectors.vitals, item.hitLocations.filter(x => x.name.indexOf("vitals") > -1));
	}
	function enterInventory(context, char) {
		console.log("enterInventory");
		context.querySelector(selectors.inventoryTab).click()
		waitForDOM(context.querySelector(selectors.items), selectors.items, null, function () {
			addRows(selectors.items, context.querySelector(selectors.items), enterItem, char.equipment);
		})
	}
	function enterItem(target, item) {
		console.log("enterItem", target, item);
		updateValue(target, selectors.cost, item.unitCost);
		updateValue(target, selectors.count, item.quantity);
		updateValue(target, selectors.name, item.name);
		updateValue(target, selectors.weight, item.unitWeight);
		updateValue(target, selectors.notes, item.description);
	}
	function enterLanguage(target, language) {
		console.log("enterLanguage", target, language);
		updateValue(target, selectors.name, language.name);
		updateValue(target, selectors.spoken, language.spoken);
		updateValue(target, selectors.written, language.written);
	}
	function enterMeleeWeapon(target, item) {
		console.log("enterMeleeWeapon", target, item);
		
		var split = item.damage.split(" ")
		, type = damageTypes[split[1]]
		, magnitude = split[0];
		
		updateValue(target, selectors.damage, magnitude);
		updateValue(target, selectors.name, item.usage);
		updateValue(target, selectors.reach, item.reach);
		updateValue(target, selectors.skill, item.level);
		updateValue(target, selectors.block, item.block);
		updateValue(target, selectors.parry, item.parry);
		updateValue(target, selectors.strength, item.strength);
		updateValue(target, selectors.type, type);
	}
	function enterName(context, name) {
		context.querySelector(selectors.bioInfo).click();
		context.querySelector(selectors.editButton).click();

		var editContext = getForegroundCharSheet();
		waitForDOM(editContext, 'input.name', null, function () {
			editContext.querySelector('input.name').value = name;
			editContext.querySelector('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only[type="button"][role="button"][aria-disabled="false"]').click();
		});
	}
	function enterRangedWeapon(target, item) {
		console.log("enterRangedWeapon", target, item);

		var split = item.damage.split(" ")
		, type = damageTypes[split[1]]
		, magnitude = split[0];

		updateValue(target, selectors.acc, item.accuracy);
		updateValue(target, selectors.bulk, item.bulk);
		updateValue(target, selectors.damage, magnitude);
		updateValue(target, selectors.name, item.description);
		updateValue(target, selectors.range, item.range);
		updateValue(target, selectors.recoil, item.recoil);
		updateValue(target, selectors.rof, item.rof);
		updateValue(target, selectors.shots, item.shots);
		updateValue(target, selectors.skill, item.level);
		updateValue(target, selectors.strength, item.strength);
		updateValue(target, selectors.type, type);
	}
	function enterSkill(target, skill) {
		console.log("enterSkill", target, skill);
		
		var split = skill.difficulty.split("/")
		, attr = skillBases[split[0]]
		, diff = skillDifficulties[split[1]];
		
		updateValue(target, selectors.name, skill.name);
		updateValue(target, selectors.level, skill.level);
		updateValue(target, selectors.attr, attr);
		updateValue(target, selectors.points, skill.points);
		updateValue(target, selectors.notes, skill.description);
		updateValue(target, selectors.difficulty, diff);
	}
	function enterSkills(context, char) {
		context.querySelector(selectors.skillsTab).click()
		waitForDOM(context, selectors.skills, null, function () {
			addRows(
				selectors.skills,
				context.querySelector(selectors.skills),
				enterSkill,
				char.skills);
		});
	}
	function enterSpell(target, spell) {
		console.log("enterspell", target, spell);
		updateValue(target, selectors.name, spell.name);
		updateValue(target, selectors.notes, spell.description);
		updateValue(target, selectors.difficulty, spell.difficulty);
		updateValue(target, selectors.points, spell.points);
		updateValue(target, selectors.castTime, spell.castTime);
		updateValue(target, selectors.duration, spell.duration);
		updateValue(target, selectors.cost, spell.manaCost);
		updateValue(target, selectors.maintain, spell.manaMaintain);
		updateValue(target, selectors.ref, spell.ref);
	}
	function enterSpells(context, char) {
		console.log("enterSpells", context);

		context.querySelector(selectors.grimoireTab).click()
		waitForDOM(context, selectors.spells, null, function () {
			addRows(
				selectors.spells,
				context.querySelector(selectors.spells),
				enterSpell,
				char.spells);
		});
	}

	return {
		getInstance: function () {
			return new Constructor();
		}
	};
})();

var sheetTypeTwoController = (function () {
	var selectors = {
		acc: 'input[name="attr_acc"]',
		//add: 'button.repcontrol_add',
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
		characterSheetTabContext: 'div.dialog.characterdialog.ui-dialog-content.ui-widget-content > div > ul > li:nth-child(2) > a',
		characterSheetWindow: 'body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable'
	};
	function Constructor() {}
	Constructor.prototype.import = function (char) {
		setupChar(char);
	};
	function setupChar(char) {
		console.log("setupChar");
		var context;

		waitForDOM(document, selectors.characterSheetWindow, null, function () {
			setTimeout(function () {
				context = getForegroundCharSheet();

				if (confirm("overwrite?")) {
					clearForm();
				}

				waitForDOM(context, selectors.characterSheetTabContext, null, function () {
					setTimeout(function () {
						context.querySelector(selectors.characterSheetTabContext).click();

						waitForDOM(context, selectors.mainTab, null, function () {
							context.querySelector(selectors.mainTab).click();
							waitForDOM(context, selectors.mainTab, null, function () {
								promise.then(function (val) {
									return new Promise(function (resolve, reject) {
										main(context, char);
										setTimeout(function () {
											resolve();
											console.log("main tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										skills(context, char);
										setTimeout(function () {
											resolve();
											console.log("skill tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										traits(context, char);
										setTimeout(function () {
											resolve();
											console.log("traits tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										inventory(context, char);
										setTimeout(function () {
											resolve();
											console.log("inventory tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										powers(context, char);
										setTimeout(function () {
											resolve();
											console.log("power tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										various(context, char);
										setTimeout(function () {
											resolve();
											console.log("various tab data entry resolving at ", Date.now());
										}, 5000);
									})
								}).then(function (val) {
									return new Promise(function (resolve, reject) {
										enterName(context, char);
										setTimeout(function () {
											resolve();
											console.log("name entry resolved at ", Date.now());
										}, 5000);
									})
								})
							});
						});
					}, 500);
				});
			}, 500);
		});
	}

	function clearForm() {
		promise.then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.mainTab, selectors.meleeWeapons);
				clearSection(selectors.mainTab, selectors.rangedWeapons);
				setTimeout(function () {
					resolve();
					console.log("main tab resolving at ", Date.now());
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.skillsTab, selectors.skillsContext);
				setTimeout(function () {
					resolve();
					console.log("skills resolving at ", Date.now());
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.traitsTab, selectors.traitsContext);
				setTimeout(function () {
					resolve();
					console.log("traits resolving at ", Date.now());
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.inventoryTab, selectors.consumablesContext);
				clearSection(selectors.inventoryTab, selectors.otherItemsContext);
				setTimeout(function () {
					resolve();
					console.log("inventory resolving at ", Date.now());
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.powersTab, selectors.powersContext);
				setTimeout(function () {
					resolve();
					console.log("powers resolving at ", Date.now());
				}, 2000);
			})
		}).then(
			function (val) {
			return new Promise(function (resolve, reject) {
				clearSection(selectors.variousTab, selectors.languageContext);
				setTimeout(function () {
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

	function enterAdvantage(context, advantage) {
		console.log("enterAdvantage", "context", context || "", "advantage", advantage);
		updateValue(context, selectors.name, advantage.name);
		updateValue(context, selectors.description, advantage.notes);
		updateValue(context, selectors.ref, advantage.ref);
	}
	function enterHitLocations(context, char) {
		console.log("enterRangedWeapon", context);
		updateValue(context, selectors.armsDRBack, char.hitLocations.filter(x => x.name.indexOf("arms") > -1).dr);
		updateValue(context, selectors.armsDRFront, char.hitLocations.filter(x => x.name.indexOf("arms") > -1).dr);
		updateValue(context, selectors.eyesDRBack, char.hitLocations.filter(x => x.name.indexOf("eyes") > -1).dr);
		updateValue(context, selectors.eyesDRFront, char.hitLocations.filter(x => x.name.indexOf("eyes") > -1).dr);
		updateValue(context, selectors.faceDRBack, char.hitLocations.filter(x => x.name.indexOf("face") > -1).dr);
		updateValue(context, selectors.faceDRFront, char.hitLocations.filter(x => x.name.indexOf("face") > -1).dr);
		updateValue(context, selectors.feetDRBack, char.hitLocations.filter(x => x.name.indexOf("feet") > -1).dr);
		updateValue(context, selectors.feetDRFront, char.hitLocations.filter(x => x.name.indexOf("feet") > -1).dr);
		updateValue(context, selectors.groinDRBack, char.hitLocations.filter(x => x.name.indexOf("groin") > -1).dr);
		updateValue(context, selectors.groinDRFront, char.hitLocations.filter(x => x.name.indexOf("groin") > -1).dr);
		updateValue(context, selectors.handsDRBack, char.hitLocations.filter(x => x.name.indexOf("hands") > -1).dr);
		updateValue(context, selectors.handsDRFront, char.hitLocations.filter(x => x.name.indexOf("hands") > -1).dr);
		updateValue(context, selectors.legsDRBack, char.hitLocations.filter(x => x.name.indexOf("legs") > -1).dr);
		updateValue(context, selectors.legsDRFront, char.hitLocations.filter(x => x.name.indexOf("legs") > -1).dr);
		updateValue(context, selectors.neckDRBack, char.hitLocations.filter(x => x.name.indexOf("neck") > -1).dr);
		updateValue(context, selectors.neckDRFront, char.hitLocations.filter(x => x.name.indexOf("neck") > -1).dr);
		updateValue(context, selectors.skullDRBack, char.hitLocations.filter(x => x.name.indexOf("skull") > -1).dr);
		updateValue(context, selectors.skullDRFront, char.hitLocations.filter(x => x.name.indexOf("skull") > -1).dr);
		updateValue(context, selectors.torsoDRBack, char.hitLocations.filter(x => x.name.indexOf("torso") > -1).dr);
		updateValue(context, selectors.torsoDRFront, char.hitLocations.filter(x => x.name.indexOf("torso") > -1).dr);
	}
	function enterItem(context, item) {
		console.log("enterItem", context, item);
		updateValue(context, selectors.name, item.name);
		updateValue(context, selectors.ref, item.ref);
		updateValue(context, selectors.description, item.notes);
		updateValue(context, selectors.weight, item.weight);
		updateValue(context, selectors.quantity, item.quantity);
	}
	function enterLanguage(context, language) {
		console.log("enterLanguage", context, language);
		updateValue(context, selectors.name, language.name);
		updateValue(context, selectors.spoken, language.spoken);
		updateValue(context, selectors.written, language.written);
	}
	function enterMeleeWeapon(context, item) {
		console.log("enterMeleeWeapon", context, item);
		updateValue(context, selectors.damage, item.damage);
		updateValue(context, selectors.name, item.usage);
		updateValue(context, selectors.reach, item.reach);
		updateValue(context, selectors.skill, item.level);
		updateValue(context, selectors.type, item.damageType);
	}
	function enterName(context, char) {
		context.querySelector(selectors.bioInfo).click();
		context.querySelector(selectors.editButton).click();

		var editContext = getForegroundCharSheet();
		waitForDOM(editContext, 'input.name', null, function () {
			editContext.querySelector('input.name').value = char.identity.name;
			editContext.querySelector('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only[type="button"][role="button"][aria-disabled="false"]').click();
		});
	}
	function enterRangedWeapon(context, item) {
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
	function enterSkill(context, skill) {
		console.log("enterSkill", context, skill);
		updateValue(context, selectors.name, skill.name);
		updateValue(context, selectors.description, skill.notes);
		updateValue(context, selectors.ref, skill.ref);
		updateValue(context, selectors.tl, skill.tl);
		updateValue(context, selectors.controllingAttribute, skill.attr);
		updateValue(context, selectors.level, skill.level - 10);
	}
	function enterTechnique(context, skill) {
		console.log("enterTechnique", context, skill);
		updateValue(context, selectors.name, skill.name);
		updateValue(context, selectors.notes, skill.notes);
		updateValue(context, selectors.ref, skill.ref);
		updateValue(context, selectors.controllingAttribute, skill.attr);
		updateValue(context, selectors.level, skill.level);
	}
	function enterSpell(context, spell) {
		console.log("enterspell", context, spell);
		updateValue(context, selectors.name, spell.name);
		updateValue(context, selectors.ref, spell.ref);
		updateValue(context, selectors.effect, "cast time:  " + spell.castTime + "   " + spell.notes);
		updateValue(context, selectors.duration, spell.duration);
		updateValue(context, selectors.cost, "cost:  " + spell.cost + "  maintain:  " + spell.maintain);
		updateValue(context, selectors.level, spell.level);
		updateValue(context, selectors.controllingAttribute, spell.attr);
	}
	function inventory(context, char) {
		console.log("enterInventory", context, char);
		context.querySelector(selectors.inventoryTab).click()
		addRows(selectors.inventoryContext, context.querySelector(selectors.otherItemsContext), enterItem, char.equipment);
	}
	function main(context, char) {
		console.log("main", context, char);
		var steve = context.querySelector(selectors.mainTab); //.click();
		steve.click();
		waitForDOM(context, selectors.attributeContext, null, function () {
			var attributeContext = context.querySelector(selectors.attributeContext);
			var defensesContext = context.querySelector(selectors.defensesContext);

			// updateValue(defensesContext, selectors.block, char.block);
			updateValue(defensesContext, selectors.dodge, char.encumbrance[0].dodge);
			// updateValue(defensesContext, selectors.load, char.lift);

			updateValue(attributeContext, selectors.death, char.tracking.hp.death1);
			updateValue(attributeContext, selectors.dexterity, char.stats.primary.dx);
			// updateValue(attributeContext, selectors.energyReserve, char.energyReserve);
			updateValue(attributeContext, selectors.fear, char.stats.secondary.frightCheck);
			updateValue(attributeContext, selectors.fp, char.stats.secondary.fp);
			updateValue(attributeContext, selectors.health, char.stats.primary.ht);
			updateValue(attributeContext, selectors.hearing, char.stats.senses.hearing);
			updateValue(attributeContext, selectors.hp, char.tracking.hp.full);
			updateValue(attributeContext, selectors.intelligence, char.stats.primary.iq);
			updateValue(attributeContext, selectors.knockout, char.tracking.hp.collapse);
			updateValue(attributeContext, selectors.maxFp, char.stats.secondary.fp);
			updateValue(attributeContext, selectors.maxHp, char.stats.secondary.hp);
			updateValue(attributeContext, selectors.move, char.stats.secondary.basicMove);
			updateValue(attributeContext, selectors.perception, char.stats.secondary.perception);
			updateValue(attributeContext, selectors.smell, char.stats.senses.smell);
			updateValue(attributeContext, selectors.speed, char.stats.secondary.basicSpeed);
			updateValue(attributeContext, selectors.strength, char.stats.primary.st);
			updateValue(attributeContext, selectors.taste, char.stats.senses.taste);
			updateValue(attributeContext, selectors.touch, char.stats.senses.touch);
			updateValue(attributeContext, selectors.vision, char.stats.senses.vision);
			updateValue(attributeContext, selectors.will, char.stats.secondary.will);

			enterHitLocations(context.querySelector(selectors.armorContext), char);
			addRows(selectors.meleeAttacks, context.querySelector(selectors.meleeWeapons), enterMeleeWeapon, char.meleeWeapons);
			addRows(selectors.rangedAttacks, context.querySelector(selectors.rangedWeapons), enterRangedWeapon, char.rangedWeapons);

			//updateValue(updateContext.querySelector(selectors.miscellaneous), selectors.tl, char.tl);
			//_execNextCallback(callbacks);
		});
	}
	function powers(context, char) {
		console.log("enterSpells", context);

		context.querySelector(selectors.powersTab).click()
		addRows(
			selectors.spells,
			context.querySelector(selectors.powersContext),
			enterSpell,
			char.spells);
	}
	function skills(context, char) {
		console.log("skills", 'context', context);
		context.querySelector(selectors.skillsTab).click()
		addRows(
			selectors.skills,
			context.querySelector(selectors.skillsContext),
			enterSkill,
			char.skills);
	}
	function traits(context, char) {
		console.log("traits", 'context', context);
		context.querySelector(selectors.traitsTab).click()
		addRows(
			selectors.disadvantages,
			context.querySelector(selectors.traitsContext),
			enterAdvantage,
			char.traits.filter(x => !x.spoken && x.points.slice(0, 1) === "-"));
		addRows(
			selectors.advantages,
			context.querySelector(selectors.traitsContext),
			enterAdvantage,
			char.traits.filter(x => !x.spoken && x.points.slice(0, 1) !== "-"));
	}
	function various(context, char) {
		console.log("various", "context", context);
		//todo
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
			char.traits.filter(x => x.spoken));
		updateValue(context, selectors.characterName, char.identity.name);
	}
	return {
		getInstance: function () {
			return new Constructor();
		}
	};
})();

var fileUploadController = (function () {
	function Constructor() {}
	//setup some events and the dropzone
	Constructor.prototype.init = function () {
		var selector = "#journal";
		// var selector = "#journalfolderroot > ol > li:nth-child(1) > ol";
		setupDropzone(selector,
			function (context) {
			console.log("visual change here");
		},
			function (context) {
			console.log("visual change here");
		},
			drop);
	}
	function setupDropzone(context, enterCallback, overCallback, dropCallback) {
		console.log("setting up dropzone");

		var dropbox;
		dropbox = document.querySelector(context);
		dropbox.addEventListener("dragenter", enterCallback, false);
		dropbox.addEventListener("dragover", overCallback, false);
		dropbox.addEventListener("drop", dropCallback, false);
	}

	return {
		getInstance: function () {
			return new Constructor();
		}
	};
	function drop(e) {
		console.log("drop", e);

		var blobHandler = BlobHandler.getInstance();
		var dt = e.dataTransfer;
		var files = dt.files;

		e.stopPropagation();
		e.preventDefault();

		blobHandler.handleFileSelection(files, function (data) {
			parseFile(data.srcElement.result);
		});
	}
	function parseFile(text) {
		console.log("parseFile");
		var dtc = GCSDataTransformController.getInstance();
		var char = dtc.export(text);
		addCharacter();

		setTimeout(function () {
			if (confirm("Ok for Type 2 sheet, Cancel for Type 1 sheet")) {
				sheetTypeTwoController.getInstance().import(char);
			} else {
				sheetTypeOneController.getInstance().import(char);
			}
		}, 1000);
	}
	//click the add character button and then click save changes
	function addCharacter() {
		console.log("addCharacter");
		var contentDiv = document.querySelector('#journal > div:nth-child(2)'),
		characterPopout = document.querySelector('div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.ui-dialog-buttons'),
		addButton = '.superadd',
		addCharacter = '#addnewcharacter',
		saveChanges = 'div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1)';

		waitForDOM(contentDiv, addButton, null, function () {
			document.querySelector(addButton).click();

			waitForDOM(contentDiv, addCharacter, null, function () {
				document.querySelector(addCharacter).click();

				waitForDOM(document, saveChanges, null, function () {
					setTimeout(function () {
						document.querySelector(saveChanges).click();
					}, 1000);
				});
			});
		});
	}
})();

//common functions
function addRow(section, callback, item) {
	console.log("addRow", 'callback', callback, 'item', item, 'section', section);
	var newRow = getNewRow(section);
	if (newRow) {
		callback(newRow, item);
	}
}
function addRows(selector, section, callback, list) {
	console.log("addRows", selector, section, callback, list);

	list.forEach(function (item) {
		promise.then(function (val) {
			return new Promise(function (resolve, reject) {
				addRow(section, callback, item);
				setTimeout(function () {resolve();}, 500);
			})
		})
	});
}
function clearSection(tab, selector) {
	console.log("clearSection", tab, selector);
	var section = document.querySelector(selector);
	var editButton = section.querySelector('button.repcontrol_edit');
	var deleteButtons;
	console.log("section", section);
	console.log("editButton", editButton);

	try {
		document.querySelector(tab).click();
	} catch (e) {
		console.log("nothing to click");
	}

	editButton.click();
	waitForDOM(section, 'button.repcontrol_del', null, function () {
		deleteButtons = section.querySelectorAll('button.repcontrol_del');
		deleteButtons.forEach(function (button) {
			button.click();
		});
		editButton.click();
	});
}
function findEmptyRow(context, selector) {
	var rowSelector = 'div.repitem';
	console.log("findEmptyRow", context, selector);
	var rows = context.querySelectorAll(rowSelector);
	//console.log("rows", rows);
	var i;
	var returnMe = null;
	//for (i = 0; i < rows.length; i++)
	rows.forEach(function (row) {
		var val = row.querySelector('input[name="attr_name"]').value;
		if ((val === '') && (!returnMe)) {
			//console.log("findEmptyRow returning", row);
			returnMe = row;
		}
	});
	return returnMe;
}
function getForegroundCharSheet() {
	//this gets every sheet that has been clicked, even if they are not visible, because they stay in markup
	var sheetsInMarkup = document.querySelectorAll("[data-characterid]");
	//console.log("sheets", sheetsInMarkup);
	var context = null;
	var highestZ = -1;

	sheetsInMarkup.forEach(function (sheet) {
		if ((sheet.currentStyle) && (sheet.currentStyle.display === "block") || (getComputedStyle(sheet, null).display === "block")) {
			var parent = sheet.parentElement;

			if (parent.style.zIndex > highestZ) {
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
function getNewRow(context) {
	var rowSelector = 'div.repitem';
	var addButtonSelector = 'button.repcontrol_add';

	console.log("getNewRow", 'context', context);
	return waitForDOM(context, addButtonSelector, null, function () {
		context.querySelector(addButtonSelector).click();
		return waitForDOM(context, rowSelector, findEmptyRow, function (result) {
			return result;
		});
	});
}
function triggerEvent(target, eventName) {
	var event;
	// The custom event that will be created
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(eventName, true, true);
	} else {
		event = document.createEventObject();
		event.eventType = eventName;
	}
	event.eventName = eventName;
	if (document.createEvent) {
		target.dispatchEvent(event);
	} else {
		target.fireEvent("on" + event.eventType, event);
	}
}
function updateValue(context, selector, value) {
	console.log("updateValue", "context", context, "selector", selector, "value", value)
	if (!context) {
		context = document;
	}
	var target = context.querySelector(selector);
	if (target) {
		target.click()
		target.focus();
		target.value = value;

		triggerEvent(target, 'change');
		triggerEvent(target, 'keydown');
		triggerEvent(target, 'keyup');
		triggerEvent(target, 'blur');
	}
}
function waitForDOM(context, selector, testCallback, doneCallback, endTime) {
	//console.log('waitForDOM', 'context', context, 'selector', selector, 'testCallback', testCallback, 'doneCallback', doneCallback, 'endTime', endTime);
	var element,
	testResult = null;

	if (!context) {
		context = document;
	}
	if (!testCallback) {
		testCallback = function (context, selector, element) {
			return element ? true : false;
		}
	}
	if (!endTime) {
		endTime = new Date();
		endTime = endTime.setSeconds(endTime.getSeconds() + 15);
	}

	element = context.querySelector(selector);
	testResult = testCallback(context, selector, element);

	if (testResult) {
		return doneCallback(testResult);
	} else if (Date.now() <= endTime) {
		//console.log('delaying', 'now', Date.now(), 'end', endTime);
		setTimeout(function () {
			return waitForDOM(context, selector, testCallback, doneCallback, endTime);
		}, 100);
	} else {
		//console.log('waitForDOM returning null');
		return null;
	}
}

var BlobHandler = (function () {
	// Instance stores a reference to the Singleton
	var instance;

	function init() {
		// Singleton
		// Private methods and variables
		function _blobConstructor() {
			var returnMe = false;
			var blob = new Blob();
			if ((window.Blob)
				 || (blob)) {
				returnMe = true;
			}
			return returnMe;
		}
		function _chromeFileRead() {
			var chosenFileEntry = null;

			chooseFileButton.addEventListener('click', function (e) {
				chrome.fileSystem.chooseEntry({
					type: 'openFile'
				}, function (readOnlyEntry) {
					readOnlyEntry.file(function (file) {
						var reader = new FileReader();

						reader.onerror = errorHandler;
						reader.onloadend = function (e) {
							console.log(e.target.result);
						};

						reader.readAsText(file);
					});
				});
			});
		}
		function _chromeStorageSave(data) {
			chrome.fileSystem.getWritableEntry(chosenFileEntry, function (writableFileEntry) {
				writableFileEntry.createWriter(function (writer) {
					writer.onerror = errorHandler;
					writer.onwriteend = callback;

					chosenFileEntry.file(function (file) {
						writer.write(file);
					});
				}, errorHandler);
			});
		}
		function _chromeSupport() {
			if (chrome) {
				if (!chrome.fileSystem) {
					console.log("The Chrome File System API is not supported");
					return false;
				}

				return true;
			}
		}
		function _getBlob() {
			try {
				return new Blob([data], {
					type: 'application/json'
				});
			} catch (e) {
				// Old browser, need to use blob builder
				window.BlobBuilder = window.BlobBuilder
					 || window.WebKitBlobBuilder
					 || window.MozBlobBuilder
					 || window.MSBlobBuilder;

				if (window.BlobBuilder) {
					var bb = new BlobBuilder();
					bb.append(data);
					return bb.getBlob("application/json");
				}
			}
		}
		function _handleFileReadAbort(evt) {
			alert("File read aborted.");
		}
		function _handleFileReadError(evt) {
			switch (evt.target.error.name) {
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
		function _html5WebStorageSave(data, name) {
			var that = this;
			var blob = that._getBlob();

			if (blob) {
				name = name || Math.round((new Date()).getTime() / 1000) + ".txt"; // Produces a unique file name every second.
				return window.navigator.msSaveOrOpenBlob(blob, name);
			} else {
				console.log("Save not supported");
				return false;
			}
		}
		function _msSaveOrOpenBlobSupported() {
			if (!window.navigator.msSaveOrOpenBlob) {
				// If msSaveOrOpenBlob() is supported, then so is msSaveBlob().
				//document.getElementsByTagName('body')[0].innerHTML = "<h1>The msSaveOrOpenBlob API is not supported</h1>";
				return false;
			}

			return true;
		}
		function _startFileRead(fileObject, handler) {
			var reader = new FileReader();
			console.log("fileObject ", fileObject);

			// Set up asynchronous handlers for file-read-success, file-read-abort, and file-read-errors:
			reader.onloadend = handler; // "onloadend" fires when the file contents have been successfully loaded into memory.
			reader.abort = this._handleFileReadAbort; // "abort" files on abort.
			reader.onerror = this._handleFileReadError; // "onerror" fires if something goes awry.

			if (fileObject) {
				reader.readAsText(fileObject);
			} else {
				console.log("fileObject is null in _startFileRead().");
				return false;
			}
		}
		function _available() {
			return _blobConstructor() && _msSaveOrOpenBlobSupported();
		}

		//return _available() ? {
		return {
			// Public methods and variables
			//public
			saveFile: function (data) {
				console.log("Helper.saveFile");

				if (!!data) {
					if (this.htmlBlobSupport()) {
						this._html5WebStorageSave(data);
					} else if (this._chromeSupport()) {
						// todo add Chrome stuff here
					}
				} else {
					alert("no data");
				}
			},
			handleFileSelection: function (files, handler) {
				if (!files) {
					alert("The selected file is invalid - do not select a folder. Please reselect and try again.");
					return;
				}

				// "files" is a FileList of file objects. Try to display the contents of the selected file:
				var file = files[0];
				// The way the <input> element is set up, the user cannot select multiple files.

				if (!file) {
					alert("Unable to access " + file.name.toUpperCase() + "Please reselect and try again.");
					return;
				}
				if (file.size === 0) {
					alert("Unable to access " + file.name.toUpperCase() + " because it is empty. Please reselect and try again.");
					return;
				}
				if (!file.type.match('text/.*')) {
					alert("Unable to access " + file.name.toUpperCase() + " because it is not a known text file type. Please reselect and try again.");
					return;
				}

				// Assert: we have a valid file.

				_startFileRead(file, handler);
				//document.getElementById('hideWrapper').style.display = 'none'; // Remove the file picker dialog from the screen since we have a valid file.
			},
			loadFile: function (name, callback) {
				var blob = new Blob();
				// Now the user will have the option of clicking the Save button and the Open button.
				window.navigator.msSaveOrOpenBlob(blob, name);
				return callback(blob) || blob;
			},
			displayFileSelectDialogue: function (callback) {
				var self = this;
				var fileSelector = document.createElement('input');
				var selectDialogueLink = document.createElement('a');

				fileSelector.setAttribute('type', 'file');
				fileSelector.setAttribute('style', 'display:none');
				fileSelector.onchange = function (result) {
					console.log('fileSelector.onchange result', result);
					self.handleFileSelection(this.files, callback);
				};

				selectDialogueLink.setAttribute('href', '');
				selectDialogueLink.innerText = "Select File";
				selectDialogueLink.addEventListener("click", function () {}, false);

				document.body.appendChild(selectDialogueLink);
				selectDialogueLink.click();
				//todo return the blob?
			}

			//} : null;
		};
	};

	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();

(function () {
	window.addEventListener("dragover", function (e) {
		e = e || event;
		e.preventDefault();
	}, false);
	window.addEventListener("drop", function (e) {
		e = e || event;
		e.preventDefault();
	}, false);

	var fuc = fileUploadController.getInstance();
	fuc.init();
	alert("Drag a JSON file generated by GCS onto the characters panel and your character will be imported.");
})();
