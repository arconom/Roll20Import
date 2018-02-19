
function attack(target)
{
	target.click();
}

function heal()
{}

function loop()
{
	return setInterval(function ()
	{
		chooseAction()();
	}, 1000);
}

function chooseAction()
{
	var prompt = document.querySelector("#btcp");
	var health = parseInt(document.querySelector("#pane_vitals #vrhb").textContent);
	var mana = parseInt(document.querySelector("#pane_vitals #vrm").textContent);
	var monsterCount = document.querySelectorAll("#pane_monster > div[onclick]").length;
	var tokenCount = document.querySelectorAll("#vcp > div > div").length;
	var healAvailable = document.querySelector("#qb1[onclick]") == null ? false : true;

	health = health == null ? 1 : health;

	var mapping =
	{
		"attack": 0,
		"defend": 0,
		"focus": 0,
		"spirit": 0,
		"protection": 0,
		"heal": 0,
		"fire": 0
	};

	if (!prompt)
	{
		if ((mana < 60) && (tokenCount > 0))
		{
			mapping["focus"] += 1;
		}
		if ((health < 600) && (tokenCount > 0))
		{
			mapping["defend"] += 1;
		}
		if ((mana > 5) && (health < 300) && (healAvailable))
		{
			mapping["heal"] += 5;
		}
		if (monsterCount > 1)
		{
			mapping["attack"] += 1;
		}
		if ((monsterCount > 3) && (mana > 5))
		{
			mapping["fire"] += 3;
		}

		mapping["attack"] += 1;

		return getFunction(Object.keys(mapping).reduce(function (a, b)
			{
				return mapping[a] > mapping[b] ? a : b
			}
			))();
	}
	else
	{
		prompt.click();
	}

}
function getFunction(value)
{
	var mapping =
	{
		"attack": function ()
		{
			attack(document.querySelector(".btm1[onclick]"))
		},
		"defend": function ()
		{
			document.querySelector("#ckey_defend").click()
		},
		"focus": function ()
		{
			document.querySelector("#ckey_focus").click()
		},
		"spirit": function ()
		{
			document.querySelector("#ckey_spirit").click()
		},
		"protection": function ()
		{
			document.querySelector("#qb2").click()
		},
		"heal": function ()
		{
			document.querySelector("#qb1").click()
		},
		"fire": function ()
		{
			document.querySelector("#qb4").click()
			setTimeout(function ()
			{
				attack(document.querySelectorAll(".btm1[onclick]"))[1];
			}, 1000);
		}
	};

	if (!mapping[value])
	{
		return
	}

	return mapping[value] == null ? mapping["attack"] : mapping[value];
}

var interval;

function start()
{
	interval = loop();
	this.onclick = stop;
	this.textContent = "stop";
}
function stop()
{
	clearInterval(interval);
	this.onclick = start;
	this.textContent = "start";
}

var looper = document.createElement("button");
looper.onclick = start;
looper.textContent = "start";
document.querySelector("#pane_action").appendChild(looper);

looper.click();
