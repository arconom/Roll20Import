//todo look at using xpath for extraction
NodeList.forEach = Array.forEach;
//without promises
//var Queue = (function ()
//{
//    Queue.prototype.autorun = true;
//    Queue.prototype.running = false;
//    Queue.prototype.queue = [];
//
//    function Queue(autorun)
//    {
//        if (typeof autorun !== "undefined")
//        {
//            this.autorun = autorun;
//        }
//        this.queue = []; //initialize the queue
//    };
//
//    Queue.prototype.add = function (callback)
//    {
//        var _this = this;
//        //add callback to the queue
//        this.queue.push(function ()
//        {
//            var finished = callback();
//            if (typeof finished === "undefined" || finished)
//            {
//                //  if callback returns `false`, then you have to
//                //  call `next` somewhere in the callback
//                _this.dequeue();
//            }
//        });
//
//        if (this.autorun && !this.running)
//        {
//            // if nothing is running, then start the engines!
//            this.dequeue();
//        }
//
//        return this; // for chaining fun!
//    };
//
//    Queue.prototype.dequeue = function ()
//    {
//        this.running = false;
//        //get the first element off the queue
//        var shift = this.queue.shift();
//        if (shift)
//        {
//            this.running = true;
//            shift();
//        }
//        return shift;
//    };
//
//    Queue.prototype.next = Queue.prototype.dequeue;
//
//    return Queue;
//
//})();
//
//// passing false into the constructor makes it so
//// the queue does not start till we tell it to
//var q = new Queue(false).add(function ()
//{
//    //start running something
//}).add(function ()
//{
//    //start running something 2
//}).add(function ()
//{
//    //start running something 3
//});
//
//setTimeout(function ()
//{
//    // start the queue
//    q.next();
//}, 2000);
// with promises
//class QueueClass {
//    constructor(autorun = true, queue = []) {
//        this.running = false;
//        this.autorun = autorun;
//        this.queue = queue;
//        this.previousValue = undefined;
//    }
//
//        add(cb) {
//            this.queue.push((value) => {
//                const finished = new Promise((resolve, reject) => {
//                    const callbackResponse = cb(value);
//
//                    if (callbackResponse !== false) {
//                        resolve(callbackResponse);
//                    } else {
//                        reject(callbackResponse);
//                    }
//                });
//
//                finished.then(this.dequeue.bind(this), (() => {}));
//            });
//
//            if (this.autorun && !this.running) {
//                this.dequeue();
//            }
//
//            return this;
//        }
//
//        dequeue(value) {
//            this.running = this.queue.shift();
//
//            if (this.running) {
//                this.running(value);
//            }
//
//            return this.running;
//        }
//
//    get next() {
//        return this.dequeue;
//    }
//    };
//const q = new QueueClass(true);
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
    charName: 'input.name[type="text"]',
    charSheet: 'a[data-tab="charsheet"]',
    combatTab: 'input[name="attr_tab"][value="4"]',
    cost: 'input[name="attr_cost"]',
    count: 'input[name="attr_count"]',
    damage: 'input[name="attr_damage"]',
    damage: 'input[name="attr_damage"]',
    deleteButton: 'button.repcontrol_del',
    dexterity: 'input[name="attr_dexterity_mod"]',
    difficulty: 'select[name="attr_difficulty"]',
    disadvantages: 'div.sheet-disadvantages',
    dodge: 'input[name="attr_dodge_mod"]',
    edit: 'button.repcontrol_edit',
    editButton: 'button.editcharacter',
    er: 'input[name="attr_energy_points_max"]',
    eyes: 'input[name="attr_eyes_dr_max"]',
    face: 'input[name="attr_face_dr_max"]',
    fear: 'input[name="attr_fear_check_mod"]',
    feet: 'input[name="attr_feet_dr_max"]',
    fp: 'input[name="attr_fatigue_points_max"]',
    generalTab: 'input[name="attr_tab"][value="1"]',
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
    skill: 'input[name="attr_skill"]',
    skills: 'div.sheet-skills',
    skillsTab: 'input[name="attr_tab"][value="3"]',
    skull: 'input[name="attr_skull_dr_max"]',
    smell: 'input[name="attr_taste_smell_mod"]',
    speed: 'input[name="attr_basic_speed_mod"]',
    spoken: 'select[name="attr_spoken"]',
    strength: 'input[name="attr_strength_mod"]',
    tl: 'input[name="attr_tl"]',
    torso: 'input[name="attr_torso_dr_max"]',
    touch: 'input[name="attr_touch_mod"]',
    type: 'select[name="attr_type"]',
    type: 'select[name="attr_type"]',
    vision: 'input[name="attr_vision_mod"]',
    vitals: 'input[name="attr_vitals_dr_max"]',
    weight: 'input[name="attr_weight"]',
    will: 'input[name="attr_willpower_mod"]',
    written: 'select[name="attr_written"]',
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
var text = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!--***** BEGIN LICENSE BLOCK *****Copyright (c) 1998-2016 by Richard A. Wilkes. All rights reserved.This Source Code Form is subject to the terms of the Mozilla Public License,version 2.0. If a copy of the MPL was not distributed with this file, Youcan obtain one at http://mozilla.org/MPL/2.0/.This Source Code Form is "Incompatible With Secondary Licenses", as definedby the Mozilla Public License, version 2.0.***** END LICENSE BLOCK *****--><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /><title>Lee Knox</title><style type="text/css" title="text/css">        	/* <![CDATA[ */        	body        	{        		color: black;        		background-color: white;        		font: normal 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;        		margin: 4pt;        	}        	        	table, tbody, tr, td        	{        		margin: 0;        		border-spacing: 0;        		border-collapse: collapse;        		font: normal 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;        	}        	        	table, tbody, tr { padding: 0; }        	        	td        	{        		padding: 1pt 1pt 0 1pt;        		vertical-align: top;        		white-space: nowrap;        	}        	        	.note        	{        		font: normal 6pt/8pt \'Lucida Sans\',\'Arial\',sans-serif;        		color: gray;        		display: block-inline;        		white-space: normal;        	}        	        	.secondary { display: block; }        	.top_info { margin: 0; }        	.list, .info { margin: 2pt 0 0 0; }        	        	.list, .info, .top_info        	{        		width: 100%;        		border: 1pt solid black;        	}        	        	#advantages { width: 270pt; }        	#skills { width: 269pt; }        	#spells, #melee_weapons, #ranged_weapons, #equipment, #notes, #copyright { width: 540pt; }        	        	.list td { border: 1pt solid black; }        	.odd { background-color: #FFF; }        	.even { background-color: #E8FFE8; }        	#encumbrance_move_dodge td, #hit_location td, #description td.label { border-left: 1pt solid black; }        	#copyright {        		color: gray;         		font: italic 7pt/9pt \'Lucida Sans\',\'Arial\',sans-serif;         		text-align: center;         		white-space: normal;         		margin: 4pt;        	}        	.top_border { border-top: 1pt solid black; }        	        	.title        	{        		border: 1pt solid black;        		background-color: silver;        		color: black;        		text-align: center;        	}        	        	.description, .value, .rvalue, .natural_damage { width: 100%; }        	.quantity, .cost, .weight, .cost_summary, .weight_summary, .ref, .level, .accuracy, .damage, .range, .rof, .shots, .bulk, .recoil, .strength, .block, .reach, .points, .spell_level, .relative_spell_level, .skill_level, .relative_skill_level, .rvalue { text-align: right; }        	.state, .parry, .natural_damage { text-align: center; }        	        	.wrapper        	{        		width: 540pt;        		border: none;        	}        	        	.wrapper > tbody > tr > td { padding: 0; }        	.spacer { width: 2pt; }        	.rowspacer1 { padding: 1pt 0 0 0; }        	.rowspacer2 { padding: 2pt 0 0 0; }        	.rowspacer3 { padding: 3pt 0 0 0; }        	.rowspacer4 { padding: 4pt 0 0 0; }        	.rowspacer5 { padding: 5pt 0 0 0; }        	        	.clabel { text-align: center; }        	.label { text-align: right; }        	        	.label, .clabel        	{        		color: gray;        		background-color: inherit;        	}        	        	.encumbrance        	{        		background-color: #FCF2C4;        		color: inherit;        	}        	        	#portrait        	{        		width: 60pt;        		height: 80pt;        	}        	        	td.portrait { width: 60pt; }        	        	td.portrait_cell        	{        		padding: 0;        		background-color: black;        	}        	        	/* ]]> */</style></head><body><table class="wrapper"><tr><td class="portrait" rowspan="2"><table class="top_info"><tr><td class="title">Portrait</td></tr><tr><td class="portrait_cell"><img id="portrait" src="Kandy%20Kane.png" alt="Portrait"/></td></tr></table></td><td class="spacer" rowspan="2"></td><td><table id="identity" class="top_info"><tr><td class="title" colspan="2">Identity</td></tr><tr><td class="label">Name:</td><td class="value">Lee Knox</td></tr><tr><td class="label">Title:</td><td class="value">Kandy Kane</td></tr><tr><td class="label">Religion:</td><td class="value"></td></tr></table></td><td class="spacer"></td><td><table id="player_info" class="top_info"><tr><td class="title" colspan="2">Player Information</td></tr><tr><td class="label">Player:</td><td class="value">Arconom</td></tr><tr><td class="label">Campaign:</td><td class="value"></td></tr><tr><td class="label">Created On:</td><td class="value">Nov 30, 2016</td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="points" class="top_info"><tr><td class="title" colspan="2">100 Points</td></tr><tr><td class="label">Attributes:</td><td class="rvalue">0</td></tr><tr><td class="label">Advantages:</td><td class="rvalue">99</td></tr><tr><td class="label">Disadvantages:</td><td class="rvalue">-45</td></tr><tr><td class="label">Quirks:</td><td class="rvalue">-1</td></tr><tr><td class="label">Skills:</td><td class="rvalue">43</td></tr><tr><td class="label">Spells:</td><td class="rvalue">0</td></tr><tr><td class="label">Race:</td><td class="rvalue">0</td></tr><tr><td class="rowspacer2" colspan="2"></td></tr><tr class="top_border"><td class="rowspacer1" colspan="2"></td></tr><tr><td class="label">Earned:</td><td class="rvalue">4</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr></table></td></tr><tr><td colspan="3"><table id="description" class="info"><tr><td class="title" colspan="6">Description</td></tr><tr><td class="label">Race:</td><td class="value">Human</td><td class="label">Height:</td><td class="value">5\' 9&quot;</td><td class="label">Hair:</td><td class="value">Blond, Wavy, Short</td></tr><tr><td class="label">Gender:</td><td class="value">Male</td><td class="label">Weight:</td><td class="value">162 lb</td><td class="label">Eyes:</td><td class="value">Grey</td></tr><tr><td class="label">Age:</td><td class="value">27</td><td class="label">Size:</td><td class="value">+0</td><td class="label">Skin:</td><td class="value">Light Brown</td></tr><tr><td class="label">Birthday:</td><td class="value">February 19</td><td class="label">TL:</td><td class="value">8</td><td class="label">Hand:</td><td class="value">Right</td></tr></table></td></tr></table><table class="wrapper"><tr><td rowspan="2"><table id="attributes" class="info"><tr><td class="title" colspan="2">Attributes</td></tr><tr><td class="label">Strength (ST):</td><td class="rvalue">10</td></tr><tr><td class="label">Dexterity (DX):</td><td class="rvalue">11</td></tr><tr><td class="label">Intelligence (IQ):</td><td class="rvalue">11</td></tr><tr><td class="label">Health (HT):</td><td class="rvalue">11</td></tr><tr class="top_border"><td class="label">Will:</td><td class="rvalue">11</td></tr><tr><td class="label">Fright Check:</td><td class="rvalue">11</td></tr><tr class="top_border"><td class="label">Basic Speed:</td><td class="rvalue">5.5</td></tr><tr><td class="label">Basic Move:</td><td class="rvalue">5</td></tr><tr class="top_border"><td class="label">Perception:</td><td class="rvalue">11</td></tr><tr><td class="label">Vision:</td><td class="rvalue">11</td></tr><tr><td class="label">Hearing:</td><td class="rvalue">11</td></tr><tr><td class="label">Taste &amp; Smell:</td><td class="rvalue">11</td></tr><tr><td class="label">Touch:</td><td class="rvalue">11</td></tr><tr class="top_border"><td class="natural_damage" colspan="2"><span class="label">thr: </span>1d-2<span class="label">, sw: </span>1d</td></tr><tr><td class="rowspacer2" colspan="2"></td></tr></table></td><td class="spacer" rowspan="2"></td><td><table id="encumbrance_move_dodge" class="info"><tr><td class="title" colspan="4">Encumbrance, Move &amp; Dodge</td></tr><tr><td class="title">Level</td><td class="title">Max Load</td><td class="title">Move</td><td class="title">Dodge</td></tr><tr  class="encumbrance" ><td class="label">&#8226; None (0)</td><td class="rvalue">20 lb</td><td class="rvalue">5</td><td class="rvalue">8</td></tr><tr ><td class="label">Light (1)</td><td class="rvalue">40 lb</td><td class="rvalue">4</td><td class="rvalue">7</td></tr><tr ><td class="label">Medium (2)</td><td class="rvalue">60 lb</td><td class="rvalue">3</td><td class="rvalue">6</td></tr><tr ><td class="label">Heavy (3)</td><td class="rvalue">120 lb</td><td class="rvalue">2</td><td class="rvalue">5</td></tr><tr ><td class="label">X-Heavy (4)</td><td class="rvalue">200 lb</td><td class="rvalue">1</td><td class="rvalue">4</td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="hit_location" class="info"><tr><td class="title" colspan="4">Hit Location</td></tr><tr><td class="title">Roll</td><td class="title">Where</td><td class="title">-</td><td class="title">DR</td></tr><tr><td class="clabel">-</td><td class="clabel">Eye</td><td class="label">-9</td><td class="rvalue">0</td></tr><tr><td class="clabel">3-4</td><td class="clabel">Skull</td><td class="label">-7</td><td class="rvalue">3</td></tr><tr><td class="clabel">5</td><td class="clabel">Face</td><td class="label">-5</td><td class="rvalue">0</td></tr><tr><td class="clabel">6-7</td><td class="clabel">R. Leg</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">8</td><td class="clabel">R. Arm</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">9-10</td><td class="clabel">Torso</td><td class="label">0</td><td class="rvalue">0</td></tr><tr><td class="clabel">11</td><td class="clabel">Groin</td><td class="label">-3</td><td class="rvalue">0</td></tr><tr><td class="clabel">12</td><td class="clabel">L. Arm</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">13-14</td><td class="clabel">L. Leg</td><td class="label">-2</td><td class="rvalue">0</td></tr><tr><td class="clabel">15</td><td class="clabel">Hand</td><td class="label">-4</td><td class="rvalue">1</td></tr><tr><td class="clabel">16</td><td class="clabel">Foot</td><td class="label">-4</td><td class="rvalue">0</td></tr><tr><td class="clabel">17-18</td><td class="clabel">Neck</td><td class="label">-5</td><td class="rvalue">0</td></tr><tr><td class="clabel">-</td><td class="clabel">Vitals</td><td class="label">-3</td><td class="rvalue">0</td></tr><tr><td class="rowspacer4"></td><td class="rowspacer4"></td><td class="rowspacer4"></td><td class="rowspacer4"></td></tr></table></td><td class="spacer" rowspan="2"></td><td rowspan="2"><table id="fp_hp" class="info"><tr><td class="title" colspan="2">Fatigue/Hit Points</td></tr><tr><td class="label">Current FP:</td><td class="rvalue"></td></tr><tr><td class="label">Basic FP:</td><td class="rvalue">11</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Tired:</td><td class="rvalue">3</td></tr><tr><td class="label">Collapse:</td><td class="rvalue">0</td></tr><tr><td class="label">Unconscious:</td><td class="rvalue">-11</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Current HP:</td><td class="rvalue"></td></tr><tr><td class="label">Basic HP:</td><td class="rvalue">10</td></tr><tr><td class="rowspacer1" colspan="2"></td></tr><tr class="top_border"><td class="label">Reeling:</td><td class="rvalue">3</td></tr><tr><td class="label">Collapse:</td><td class="rvalue">0</td></tr><tr><td class="label">Check #1:</td><td class="rvalue">-10</td></tr><tr><td class="label">Check #2:</td><td class="rvalue">-20</td></tr><tr><td class="label">Check #3:</td><td class="rvalue">-30</td></tr><tr><td class="label">Check #4:</td><td class="rvalue">-40</td></tr><tr><td class="label">Dead:</td><td class="rvalue">-50</td></tr></table></td></tr><tr><td><table id="lifting" class="info"><tr><td class="title" colspan="2">Lifting &amp; Moving Things</td></tr><tr><td class="label">Basic Lift:</td><td class="rvalue">20 lb</td></tr><tr><td class="label">One-Handed Lift:</td><td class="rvalue">40 lb</td></tr><tr><td class="label">Two-Handed Lift:</td><td class="rvalue">160 lb</td></tr><tr><td class="label">Shove &amp; Knock Over:</td><td class="rvalue">240 lb</td></tr><tr><td class="label">Running Shove &amp; Knock Over:</td><td class="rvalue">480 lb</td></tr><tr><td class="label">Carry On Back:</td><td class="rvalue">300 lb</td></tr><tr><td class="label">Shift Slightly:</td><td class="rvalue">1,000 lb</td></tr></table></td></tr></table><table class="wrapper"><tr><td><table id="advantages" class="list"><tr><td class="title">Advantages &amp; Disadvantages</td><td class="title">Pts</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Advantages</td><td class="points">49</td><td class="ref"></td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Appearance<div class="note">Androgynous, +0; Handsome, +12.</div></td><td class="points">12</td><td class="ref">B21</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Charisma 1<div class="note">+1/level to Influence rolls</div></td><td class="points">5</td><td class="ref">B41</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Fashion Sense</td><td class="points">5</td><td class="ref">B21</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Fit<div class="note">+1 to all HT rolls to stay conscious, avoid death, resist disease, resist poison; recover FP at twice the normal rate (but not FP spent for spells or psi powers)</div></td><td class="points">5</td><td class="ref">B55</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Flexibility</td><td class="points">5</td><td class="ref">B56</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Language: English<div class="note">Native, -6; Spoken (Native), +3; Written (Native), +3.</div></td><td class="points">0</td><td class="ref">B24</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Language: French<div class="note">Spoken (Accented), +2; Written (Accented), +2.</div></td><td class="points">4</td><td class="ref">B24</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Reputation 2<div class="note">People Affected (customers, fans), x0.33; Recognized sometimes (10-), x0.5.</div></td><td class="points">1</td><td class="ref">B26</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Slippery 1</td><td class="points">2</td><td class="ref">B85</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Voice</td><td class="points">10</td><td class="ref">B97</td></tr><tr class="even"><td class="description" >Disadvantages</td><td class="points">-45</td><td class="ref"></td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Jealousy</td><td class="points">-10</td><td class="ref">B140</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Pacifism: Self-Defense Only</td><td class="points">-15</td><td class="ref">B148</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Sense of Duty<div class="note">Friends and Companions, -5.</div></td><td class="points">-5</td><td class="ref">B153</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Social Disease</td><td class="points">-5</td><td class="ref">B155</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Social Stigma (Minority Group)<div class="note">-2 Reaction from others; +2 Reaction in own group</div></td><td class="points">-10</td><td class="ref">B155</td></tr><tr class="even"><td class="description" >Quirks</td><td class="points">-1</td><td class="ref"></td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Responsive</td><td class="points">-1</td><td class="ref">B164</td></tr><tr class="even"><td class="description" >Attributes</td><td class="points">50</td><td class="ref"></td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Increased Intelligence 1</td><td class="points">20</td><td class="ref">B15</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Increased Health 1</td><td class="points">10</td><td class="ref">B14</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Increased Dexterity 1</td><td class="points">20</td><td class="ref">B15</td></tr></table></td><td class="spacer"></td><td><table id="skills" class="list"><tr><td class="title">Skills</td><td class="title">SL</td><td class="title">RSL</td><td class="title">Pts</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Acrobatics</td><td class="skill_level">10</td><td class="relative_skill_level">DX-1</td><td class="points">2</td><td class="ref">B174</td></tr><tr class="even"><td class="description" >Acting<div class="note">Default: Performance - 2</div></td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B174</td></tr><tr class="odd"><td class="description" >Area Knowledge (Seattle)<div class="note">All important businesses, streets, citizens, leaders, etc.</div></td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B176</td></tr><tr class="even"><td class="description" >Body Language</td><td class="skill_level">10</td><td class="relative_skill_level">Per-1</td><td class="points">1</td><td class="ref">B181</td></tr><tr class="odd"><td class="description" >Carousing</td><td class="skill_level">11</td><td class="relative_skill_level">HT+0</td><td class="points">1</td><td class="ref">B183</td></tr><tr class="even"><td class="description" >Computer Operation/TL8</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B184</td></tr><tr class="odd"><td class="description" >Connoisseur (Dance)</td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B185</td></tr><tr class="even"><td class="description" >Connoisseur (Music)</td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B185</td></tr><tr class="odd"><td class="description" >Cooking</td><td class="skill_level">12</td><td class="relative_skill_level">IQ+1</td><td class="points">4</td><td class="ref">B185</td></tr><tr class="even"><td class="description" >Current Affairs/TL8 (Popular Culture)</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B186</td></tr><tr class="odd"><td class="description" >Dancing</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">2</td><td class="ref">B187</td></tr><tr class="even"><td class="description" >Detect Lies<div class="note">Default: Body Language - 4</div></td><td class="skill_level">10</td><td class="relative_skill_level">Per-1</td><td class="points">2</td><td class="ref">B187</td></tr><tr class="odd"><td class="description" >Diplomacy</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B187</td></tr><tr class="even"><td class="description" >Disguise/TL8 (Drag)<div class="note">Default: Makeup/TL8 - 3</div></td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B187</td></tr><tr class="odd"><td class="description" >Enthrallment Skills</td><td class="skill_level"></td><td class="relative_skill_level"></td><td class="points"></td><td class="ref"></td></tr><tr class="even"><td class="description"  style="padding-left: 12px; color: red;" >Captivate</td><td class="skill_level">-</td><td class="relative_skill_level">-</td><td class="points">0</td><td class="ref">B191</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px;" >Enthrallment</td><td class="skill_level">10</td><td class="relative_skill_level">Will-1</td><td class="points">2</td><td class="ref">B191</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Persuade</td><td class="skill_level">-</td><td class="relative_skill_level">-</td><td class="points">0</td><td class="ref">B191</td></tr><tr class="odd"><td class="description"  style="padding-left: 12px; color: red;" >Suggest</td><td class="skill_level">-</td><td class="relative_skill_level">-</td><td class="points">0</td><td class="ref">B191</td></tr><tr class="even"><td class="description"  style="padding-left: 12px;" >Sway Emotions</td><td class="skill_level">-</td><td class="relative_skill_level">-</td><td class="points">0</td><td class="ref">B192</td></tr><tr class="odd"><td class="description" >Erotic Art</td><td class="skill_level">13</td><td class="relative_skill_level">DX+2</td><td class="points">1</td><td class="ref">B192</td></tr><tr class="even"><td class="description" >Escape</td><td class="skill_level">13</td><td class="relative_skill_level">DX+2</td><td class="points">1</td><td class="ref">B192</td></tr><tr class="odd"><td class="description" >Fast-Talk</td><td class="skill_level">12</td><td class="relative_skill_level">IQ+1</td><td class="points">1</td><td class="ref">B195</td></tr><tr class="even"><td class="description" >Gesture</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B198</td></tr><tr class="odd"><td class="description" >Group Performance (Choreography)<div class="note">Default: Dancing - 2</div></td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B198</td></tr><tr class="even"><td class="description" >Holdout<div class="note">Default: Sleight of Hand - 3</div></td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B200</td></tr><tr class="odd"><td class="description" >Housekeeping</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B200</td></tr><tr class="even"><td class="description" >Jumping</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B203</td></tr><tr class="odd"><td class="description" >Knot-Tying</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B203</td></tr><tr class="even"><td class="description" >Makeup/TL8</td><td class="skill_level">11</td><td class="relative_skill_level">IQ+0</td><td class="points">1</td><td class="ref">B206</td></tr><tr class="odd"><td class="description" >Performance</td><td class="skill_level">12</td><td class="relative_skill_level">IQ+1</td><td class="points">1</td><td class="ref">B212</td></tr><tr class="even"><td class="description" >Public Speaking<div class="note">Default: Performance - 2</div></td><td class="skill_level">13</td><td class="relative_skill_level">IQ+2</td><td class="points">1</td><td class="ref">B216</td></tr><tr class="odd"><td class="description" >Running</td><td class="skill_level">10</td><td class="relative_skill_level">HT-1</td><td class="points">1</td><td class="ref">B218</td></tr><tr class="even"><td class="description" >Sewing/TL8</td><td class="skill_level">11</td><td class="relative_skill_level">DX+0</td><td class="points">1</td><td class="ref">B219</td></tr><tr class="odd"><td class="description" >Sex Appeal</td><td class="skill_level">12</td><td class="relative_skill_level">HT+1</td><td class="points">1</td><td class="ref">B219</td></tr><tr class="even"><td class="description" >Singing</td><td class="skill_level">13</td><td class="relative_skill_level">HT+2</td><td class="points">1</td><td class="ref">B220</td></tr><tr class="odd"><td class="description" >Sleight of Hand</td><td class="skill_level">10</td><td class="relative_skill_level">DX-1</td><td class="points">2</td><td class="ref">B221</td></tr><tr class="even"><td class="description" >Sports (Track and Field)</td><td class="skill_level">10</td><td class="relative_skill_level">DX-1</td><td class="points">1</td><td class="ref">B222</td></tr><tr class="odd"><td class="description" >Stage Combat<div class="note">Default: Performance - 3</div></td><td class="skill_level">7</td><td class="relative_skill_level">DX-4</td><td class="points">0</td><td class="ref">B222</td></tr><tr class="even"><td class="description" >Streetwise</td><td class="skill_level">10</td><td class="relative_skill_level">IQ-1</td><td class="points">1</td><td class="ref">B223</td></tr><tr class="odd"><td class="description" >Swimming</td><td class="skill_level">11</td><td class="relative_skill_level">HT+0</td><td class="points">1</td><td class="ref">B224</td></tr></table></td></tr></table><table id="spells" class="list"><tr><td class="title">Spells</td><td class="title">Class</td><td class="title">Mana Cost</td><td class="title">Time</td><td class="title">SL</td><td class="title">RSL</td><td class="title">Pts</td><td class="title">Ref</td></tr></table><table id="melee_weapons" class="list"><tr><td class="title">Melee Weapons</td><td class="title">Usage</td><td class="title">Lvl</td><td class="title">Parry</td><td class="title">Block</td><td class="title">Damage</td><td class="title">Reach</td><td class="title">ST</td></tr><tr class="odd"><td class="description">Natural</td><td class="usage">Kick</td><td class="level">9</td><td class="parry">No</td><td class="block"></td><td class="damage">1d-2 cr</td><td class="reach">C,1</td><td class="strength"></td></tr><tr class="even"><td class="description">Natural</td><td class="usage">Kick w/Boots</td><td class="level">9</td><td class="parry">No</td><td class="block"></td><td class="damage">1d-1 cr</td><td class="reach">C,1</td><td class="strength"></td></tr><tr class="odd"><td class="description">Natural</td><td class="usage">Punch</td><td class="level">11</td><td class="parry">8</td><td class="block"></td><td class="damage">1d-3 cr</td><td class="reach">C</td><td class="strength"></td></tr></table><table id="ranged_weapons" class="list"><tr><td class="title">Ranged Weapons</td><td class="title">Usage</td><td class="title">Lvl</td><td class="title">Acc</td><td class="title">Damage</td><td class="title">Range</td><td class="title">RoF</td><td class="title">Shots</td><td class="title">Bulk</td><td class="title">Rcl</td><td class="title">ST</td></tr></table><table id="equipment" class="list"><tr><td class="title">Equipment (0.26 lb; $280)</td><td class="title">&radic;</td><td class="title">#</td><td class="title">$</td><td class="title">W</td><td class="title">&sum; $</td><td class="title">&sum; W</td><td class="title">Ref</td></tr><tr class="odd"><td class="description" >Cell Phone<div class="note">Only works in some areas; $20/month fee., 10 hrs.</div></td><td class="state">E</td><td class="quantity">1</td><td class="cost">250</td><td class="weight">0.25 lb</td><td class="cost_summary">250</td><td class="weight_summary">0.25 lb</td><td class="ref">B288</td></tr><tr class="even"><td class="description" >Cloth Gloves</td><td class="state">E</td><td class="quantity">1</td><td class="cost">15</td><td class="weight">0 lb</td><td class="cost_summary">15</td><td class="weight_summary">0 lb</td><td class="ref">B284</td></tr><tr class="odd"><td class="description" >Cloth Cap</td><td class="state">E</td><td class="quantity">1</td><td class="cost">5</td><td class="weight">0 lb</td><td class="cost_summary">5</td><td class="weight_summary">0 lb</td><td class="ref">B284</td></tr><tr class="even"><td class="description" >Cigarette Lighter</td><td class="state">E</td><td class="quantity">1</td><td class="cost">10</td><td class="weight">0.01 lb</td><td class="cost_summary">10</td><td class="weight_summary">0.01 lb</td><td class="ref">B288</td></tr></table><table id="notes" class="list"><tr><td class="title">Notes</td></tr><tr><td class="description">Lee Knox AKA Kandy Kane grew up in Seattle, raised by his father, Jeff, who resented Lee because Jeff believed that Lee was the reason why Jeff\'s wife left Jeff.  <br><br>Lee was a fairly average student with a bit of athletic talent.  He discovered during his sophomore year of high school that he was more interested in boys than in girls.  This discovery came after a chain of failed attempts at romance with the opposite sex. <br><br>Adulthood found Lee cooking at a Venezuelan restaurant to pay his way through culinary school and performance art school.  His nights were spent doing drag shows at local venues.  As a result of a lot of sexual exploration, Lee contracted HIV at the age of 23.<br><br><br><br></td></tr></table><div id="copyright">Modified at 11:01 PM on Nov 30, 2016.<br>GURPS Character Sheet is copyright &copy;1998-2016 by Richard A. Wilkes &mdash; All rights reserved worldwide.<br>Licensed for your use under Mozilla Public License, version 2.0</div></body></html>';
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
        var meleeWeaponsString = getTable(text, "melee_weapons");
        console.log('meleeWeaponsString', meleeWeaponsString);
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
        console.log("result", result);
        console.log("returnMe.lift", returnMe.lift);
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
        returnMe.name = getMatch(text, '<td class="description"  style="padding-left: 12px;" >', '(<div|' + valueEndQuery + ')') || "";
        returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
        returnMe.points = getMatch(text, '<td class="points">', valueEndQuery) || "";
        returnMe.spoken = languageLevels[getMatch(returnMe.notes, "Spoken (", ")")] || null;
        returnMe.written = languageLevels[getMatch(returnMe.notes, "Written (", ")")] || null;
        if (returnMe.name !== "")
        {
            console.log("getAdvantageData returning", returnMe);
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
        console.log("getMeleeWeaponData returning", returnMe);
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
        var rsl, nameTL;
        try
        {
            nameTL = getMatch(text, '<td class="description".+?>', '(<div|' + valueEndQuery + ')').split("/TL");
            rsl = getMatch(text, '<td class="relative_skill_level">', valueEndQuery).match('([a-zA-Z]+)([+-0123456789]+)');
            console.log("rsl", rsl);
        } catch (e)
        {
            returnMe.name = null;
        }
        returnMe.points = getMatch(text, '<td class="points">', valueEndQuery) || "";
        if (rsl)
        {
            returnMe.attr = skillBases[rsl[1]];
            returnMe.difficulty = getSkillDifficulty(rsl[2], returnMe.points).toString();
        }
        if (nameTL)
        {
            returnMe.name = nameTL[0] || "";
            returnMe.tl = nameTL[1] || "";
        }
        returnMe.notes = getMatch(text, '<div class="note">', '</div>') || "";
        returnMe.level = getMatch(text, '<td class="skill_level">', valueEndQuery) || "";
        //var temp = returnMe.name.indexOf("/TL");
        //var skillNameEndIndex = temp == -1 ? undefined : temp;
        //returnMe.name = returnMe.name.slice(0, skillNameEndIndex);
        //skill.bonus = "not implemented"
        if (returnMe.name)
        {
            console.log("getSkillData returning", returnMe);
            return returnMe;
        }
    }
    function getSpellData(text)
    {
        console.log("not implemented");
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
        console.log("getCollection", callback);
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
    function calcSkillBonus(points)
    {
        return Math.floor(points / 4) + Math.floor((points % 4) / 2) + (points % 2);
    }
    function cleanText(text)
    {
        console.log("cleanText", text);
        var returnMe = text.replace(/\r\n/, '').replace(/\t/, '').replace(/>\s+</, '><').replace("'", "\'");
        console.log("cleanText returning", returnMe);
        return returnMe;
    }
    return {
        getInstance: function ()
        {
            return new Constructor();
        }
    };
})();
var importer = (function ()
{
    function Constructor() { }
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
                enterAttributes(char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterAdvantages(char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterSkills(char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterCombatStats(char, callbacks);
            }, 200);
        });
        callbacks.push(function (callbacks)
        {
            setTimeout(function ()
            {
                enterInventory(char, callbacks);
            }, 200);
        });
        enterName(char.name);
        waitForDOM(document, selectors.generalTab, null, function ()
        {
            console.log('setupChar part 2');
            document.querySelector(selectors.charSheet).click()
            waitForDOM(document, selectors.generalTab, null, function ()
            {
                _execNextCallback(callbacks);
            });
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
                setTimeout(function (section, callback, item)
                {
                    addRow(section, callback, item, callbacks);
                }, 100, section, callback, item);
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
    function enterAdvantages(char, callbacks)
    {
        console.log("enterAdvantages", 'char', char, 'callbacks', callbacks);
        document.querySelector(selectors.advantagesTab).click()
        callbacks.unshift(
            function (callbacks)
            {
                addRows(
                    selectors.languages,
                    document.querySelector(selectors.languages),
                    enterAdvantage,
                    char.advantages.filter(x=>x.spoken),
                    callbacks);
            },
            function (callbacks)
            {
                addRows(
                    selectors.disadvantages,
                    document.querySelector(selectors.disadvantages),
                    enterAdvantage,
                    char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) === "-"),
                    callbacks);
            },
            function (callbacks)
            {
                addRows(
                    selectors.advantages,
                    document.querySelector(selectors.advantages),
                    enterAdvantage,
                    char.advantages.filter(x=>!x.spoken && x.points.slice(0, 1) !== "-"),
                    callbacks);
            });
        waitForDOM(document, selectors.languages, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function enterAttributes(char, callbacks)
    {
        console.log("enterAttributes", char);
        document.querySelector(selectors.generalTab).click();
        waitForDOM(document, selectors.attributes, null, function ()
        {
            var context = document.querySelector(selectors.attributes);
            //document.querySelector(selectors.er).value = char.er;
            //document.querySelector(selectors.er).value = char.er;
            //document.querySelector(selectors.fp).value = char.fp;
            //document.querySelector(selectors.fp).value = char.fp;
            //document.querySelector(selectors.hp).value = char.hp;
            //document.querySelector(selectors.hp).value = char.hp;
            updateValue(context, selectors.basicLift, char.lift - 20);
            updateValue(context, selectors.dexterity, char.dx - 10);
            updateValue(context, selectors.dodge, char.dodge - 8);
            updateValue(context, selectors.fear, char.fright - 10);
            updateValue(context, selectors.health, char.ht - 10);
            updateValue(context, selectors.hearing, char.hearing - 10);
            updateValue(context, selectors.iq, char.iq - 10);
            updateValue(context, selectors.move, char.move - 5);
            updateValue(context, selectors.perception, char.per - 10);
            updateValue(context, selectors.smell, char.smell - 10);
            updateValue(context, selectors.speed, char.speed - 5);
            updateValue(context, selectors.strength, char.st - 10);
            updateValue(document.querySelector(selectors.miscellaneous), selectors.tl, char.tl);
            updateValue(context, selectors.touch, char.touch - 10);
            updateValue(context, selectors.vision, char.vision - 10);
            updateValue(context, selectors.will, char.will - 10);
            _execNextCallback(callbacks);
        });
    }
    function enterCombatStats(char, callbacks)
    {
        console.log("enterCombatStats", char);
        document.querySelector(selectors.combatTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(selectors.meleeAttacks, document.querySelector(selectors.meleeAttacks), enterMeleeWeapon, char.meleeWeapons, callbacks);
        }, function (callbacks)
        {
            addRows(selectors.rangedAttacks, document.querySelector(selectors.rangedAttacks), enterRangedWeapon, char.rangedWeapons, callbacks);
        }, function (callbacks)
        {
            addRows(selectors.hitLocations, document.querySelector(selectors.hitLocations), enterHitLocations, char.rangedWeapons, callbacks);
        });
        waitForDOM(document, selectors.meleeAttacks, null, function ()
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
    function enterInventory(char, callbacks)
    {
        console.log("enterInventory", char);
        document.querySelector(selectors.inventoryTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(selectors.items, document.querySelector(selectors.items), enterItem, char.equipment, callbacks);
        });
        waitForDOM(document.querySelector(selectors.items), selectors.items, null, function ()
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
    function enterName(name)
    {
        document.querySelector(selectors.bioInfo).click();
        document.querySelector(selectors.editButton).click();
        waitForDOM(document, 'input.name', null, function ()
        {
            document.querySelector('input.name').value = name;
            document.querySelector('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only[type="button"][role="button"][aria-disabled="false"]').click();
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
    function enterSkills(char, callbacks)
    {
        document.querySelector(selectors.skillsTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(
                selectors.skills,
                document.querySelector(selectors.skills),
                enterSkill,
                char.skills,
                callbacks);
        });
        waitForDOM(document, selectors.skills, null, function ()
        {
            _execNextCallback(callbacks);
        });
    }
    function enterSpell(target, spell)
    {
        console.log("not implemented");
        //console.log("enterspell", target, spell);
    }
    function enterSpells(char, callbacks)
    {
        console.log("not implemented");

        document.querySelector(selectors.spellsTab).click()
        callbacks.unshift(function (callbacks)
        {
            addRows(
                selectors.spells,
                document.querySelector(selectors.spells),
                enterspell,
                char.spells,
                callbacks);
        });
        waitForDOM(document, selectors.spells, null, function ()
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
        console.log("rows", rows);
        var i;
        var returnMe = null;
        //for (i = 0; i < rows.length; i++)
        rows.forEach(function (row)
        {
            var val = row.querySelector(selectors.name).value;
            if ((val === '') && (!returnMe))
            {
                console.log("findEmptyRow returning", row);
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
            triggerEvent(target, 'change');
            triggerEvent(target, 'keydown');
            triggerEvent(target, 'keyup');

            target.value = value;

            target.blur();
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
function clearForm()
{
    clearSection(selectors.advantages);
    clearSection(selectors.disadvantages);
    clearSection(selectors.languages);
    clearSection(selectors.skills);
    clearSection(selectors.meleeAttacks);
    clearSection(selectors.rangedAttacks);
    clearSection(selectors.items);
}
function clearSection(selector)
{
    var section = document.querySelector(selector);
    var editButton = section.querySelector(selectors.edit);
    var deleteButtons;
    console.log("editButton", editButton);
    editButton.click();
    waitForDOM(section, selectors.deleteButton, null, function ()
    {
        deleteButtons = section.querySelectorAll(selectors.deleteButton);
        deleteButtons.forEach(function (button)
        {
            button.click();
        });
        editButton.click();
    });
}
function getMatch(text, startQuery, endQuery)
{
    console.log("getMatch", "text", text, "startQuery", startQuery, "endQuery", endQuery);
    try
    {
        var re = new RegExp(startQuery + "(.*?)" + endQuery);
        var returnMe = text.match(re);
        console.log("getMatch returning", returnMe[1]);
        return returnMe ? returnMe[1] : null;
    } catch (e)
    {
        return null;
    }
}
function waitForDOM(context, selector, testCallback, doneCallback, endTime)
{
    console.log('waitForDOM', 'context', context, 'selector', selector, 'testCallback', testCallback, 'doneCallback', doneCallback, 'endTime', endTime);
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
        console.log('delaying', 'now', Date.now(), 'end', endTime);
        setTimeout(function ()
        {
            return waitForDOM(context, selector, testCallback, doneCallback, endTime);
        }, 100);
    } else
    {
        console.log('waitForDOM returning null');
        return null;
    }
}
function selectFile()
{
    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    var selectDialogueLink = document.createElement('a');
    selectDialogueLink.setAttribute('href', '');
    selectDialogueLink.innerText = "Select File";
    selectDialogueLink.onclick = function ()
    {
        fileSelector.click();
        return false;
    }
    document.body.appendChild(selectDialogueLink);
    selectDialogueLink.click();
}
(function ()
{
    console.log("starting");
    var e = exporter.getInstance();
    var i = importer.getInstance();
    clearForm();
    setTimeout(function ()
    {
        char = e.export(text);
        i.import(char);
    }, 1000);
})();