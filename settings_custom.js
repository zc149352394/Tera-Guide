const into = "进入副本",
MODE = [
	`<font color="#A0A0A0">单人</font>`, // 0
	`<font color="#E69F00">下级</font>`, // 1
	`<font color="#00FFFF">上级</font>`, // 2
	`<font color="#00FF00">团队</font>`, // 3
	`<font color="#A0A0A0">练习</font>`, // 4
	`<font color="#A0A0A0">试炼</font>`, // 5
],
DR = {
	TipMsg: [
		"下次鉴定 -> ", "注(近x2)", "电(分散)", "炸(净化)", "注(远x2)", "电(集中)", "炸(加血)",
		`以<font color="#FF0000">[暈眩技能]</font>阻止 阿卡莎召喚`, "远程打水晶"
	],
	1000: {
		102: {txt: '前冲(击倒)'},
		107: {txt: '横冲(击倒)'},
		105: {txt: '喷毒(流血)'},
		203: {txt: 'AOE-眩晕', timeout: 800},
		304: {txt: '后退_转圈'}
	},
	2000: {
		101: {txt: '前砸'},
		// 105: {txt: '喷毒'},
		107: {txt: '后砸(眩晕)'},
		108: {txt: '高尔夫(击飞)'},
		109: {txt: '后扫'},
		110: {txt: '远离(屁孩)'},
		119: {txt: '群拉_旋转', timeout: 800}, // 102: {txt: '旋转(击退)'},
		122: {txt: '靠近(苍蝇)'},
		306: {txt: '蓄力爆炸(远离)!'}
	},
	3000: {
		// 128     106 后砸
		// 128 130 105 ← 左挥刀
		// 129 131 107 右挥刀 → // 108 前砸
		
		// 129     108 前砸
		// 128 130 105 ← 左挥刀
		// 128     106 后砸 // 107 右挥刀 →
		
		// 128     106 后砸
		// 129     108 前砸
		// 128 130 105 ← 左挥刀 // 107 右挥刀 →
		
		// 129     108 前砸
		// 128     106 后砸
		// 129 131 107 右挥刀 → // 105 ← 左挥刀
		
		// 129 131 107 右挥刀 →
		// 128     106 后砸
		// 129     108 前砸 // 105 ← 左挥刀
		
		112: {txt: '前刺_击飞'},
		106: {txt: '后砸'},
		108: {txt: '前砸'},
		130: {txt: '←← 左挥刀'},
		131: {txt: '右挥刀 →→'},
		134: {txt: '注视(近)'},
		302: {txt: '2次伤害', timeout: 2900},
		502: {txt: '蓄力一击(击退)'}
	},
	4000: {
		102: {txt: '内圈炸'},
		103: {txt: '外圈炸'},
		// 107: {txt: '正面'},
		108: {txt: '前刺'},
		109: {txt: '单点激光'},
		114: {txt: '点名圈'},
		205: {txt: '360-蠕虫'},
		206: {txt: '前|左|右(激光)'}
	},
	5000: {
		// 1101: {msg: 'Fire paw'},
		// 1102: {msg: 'Ice paw'},
		103: {txt: '尾巴(击飞!!)'},
		104: {txt: 'AOE-寒冰魔法'},
		105: {txt: 'AOE-火焰魔法'},
		107: {txt: '双色踩'},
		// 1108: {msg: 'Fire Backswing'
		// 1109: {msg: 'Ice Backswing'},
		// 1110: {msg: 'Fire paw 2'},
		// 1112: {msg: 'Ice paw 2'},
		118: {txt: '大跳(击退)'},
		119: {txt: '咆哮'},
		120: {txt: '开场咆哮'},
		//////////////////////////////
		124: {tip: ["小跳(快)", "小跳(慢)"]}
	},
	// 5002: { 3106: {} },
	// 5003: { 3106: {} },
	6000: {
		// 1101: {txt: '牢笼'},
		// 2101: {txt: '牢笼'},
		1103: {txt: '砸地'},
		2103: {txt: '砸地'},
		1104: {txt: '砸地_后扫'},
		2104: {txt: '砸地_后扫'},
		1106: {txt: '3连_重击'},
		2106: {txt: '3连_重击'},
		// 1107: {txt: '炸弹'},
		// 2107: {txt: '炸弹'},
		// 1108: {txt: '炸弹x3'},
		// 2108: {txt: '炸弹x3'},
		1109: {txt: '单手'},
		2109: {txt: '单手'},
		// 1113: {txt: '蓄力'},
		// 2113: {txt: '蓄力'},
		1110: {txt: '双手'},
		2110: {txt: '双手'},
		1133: {txt: '砸地'},
		2133: {txt: '砸地'},
		1134: {txt: '砸地_后扫'},
		2134: {txt: '砸地_后扫'},
		
		4107: {txt: '驱散BOSS'},
	},
	// 6002: {},
	7000: {
		116: {txt: '甜甜圈(击飞)'},
		136: {txt: '三抓点名'},
		// 138: {txt: '滚开!!'},
		149: {txt: '前刺(闪)'},
		151: {txt: '砸地_点名'},
		152: {txt: '前砸_后踢'},
		701: {txt: '后扫_前刺(闪)'},
		154: {txt: '远离 | 靠近'},
		155: {txt: '靠近 | 远离'},
		// 1240: {msg: 'Donuts'},
		401: {txt: '驱散!!'},
		402: {txt: '睡眠!!'},
		901: {txt: '1.注视(近)'},
		902: {txt: '2.注视(远)'},
		903: {txt: '1.炸弹(集)_净化'},
		904: {txt: '2.炸弹(集)_加血'},
		905: {txt: '1.闪电(分)'},
		906: {txt: '2.闪电(集)'},
	},
	8000: {
		1101: {txt: '← 扩散 →'},
		2101: {txt: '← 扩散 →'},
		1102: {txt: '→ 拉拢 ←'},
		2102: {txt: '→ 拉拢 ←'},
		// 1106 前方导弹 2106 前方导弹
		// 1107 后方导弹 2107 后方导弹
		// 1108 右方导弹 2108 右方导弹
		// 1109 左方导弹 2109 左方导弹
		1110: {txt: '↓↓ 雷电 ↓↓'},
		2110: {txt: '↓↓ 雷电 ↓↓'},
		3105: {txt: '点名(闪避)'},
		3108: {txt: '诅咒x2'},
		3109: {txt: '地毯鉴定'}
	},
	9000: {
		// 1101: {func: DarkanLeftAuto}, //left hand auto, right hand out
		// 1102: {func: DarkanRightAuto}, //right hand auto, left hand out 
		// 1103: {}, //left hand eviscerate slam, right hand out 
		// 1104: {}, //right swipe
		// 1105: {}, //right hand eviscerate uppercut
		// 1106: {}, //right hand eviscerate slam, left hand out 
		// 1107: {}, //left swipe
		// 1108: {}, //left hand eviscerate uppercut
		// 1109: {}, //left hand back attack
		// 1110: {}, //right hand back attack
		// 1111: {}, //spin,
		// 1112: {}, //move back
		// 1113: {}, //dash
		// 1114: {msg: 'Rake'},
		// 1115: {msg: 'Puddles', startTimer: true, delay: 55000, timerMsg: 'Puddles soon...'},
		// 1301: {msg: 'Shout', startTimer: true, delay: 55000, timerMsg: 'Shout soon...'},
		// 1302: {msg: 'Bomb'},
		// 1303: {}, //drill
		// 1304: {}, //up in air, swords orbiting (cage + donuts)
		// 1305: {}, //descent from air
		// 1306: {msg: 'Ghost', startTimer: true, delay: 55000, timerMsg: 'Ghost soon...'},
		// 1401: {func: DarkanSwipeLeft}, // left crouch, right out
		// 1402: {func: DarkanSwipeRight}, // right crouch, right out
	},
	10000: {
		// 1102: {msg: 'Donut'},
		// 1103: {msg: 'Slap'},
		// 1104: {msg: 'Jump'},
		// 1105: {msg: 'Metamorphic'}, // Front side
		// 1106: {msg: 'Grenade'},
		// 1107: {msg: 'Trample'},
		// 1108: {msg: 'Flying'},
		// 1109: {msg: 'Puddle'},
		// 1111: {msg: 'Cage'},
		// 1112: {msg: 'Stand', startTimer: true, delay: 45000, timerMsg: 'Stand soon...'}, // every ~50s
		// 1113: {msg: 'L-Metamorphic'}, //  Left side
		// 1114: {msg: 'R-Metamorphic'}, // Right side
		// 1115: {msg: 'Tail'},
		// 1201: {msg: 'Staggered'},
		// 1202: {msg: 'Trample'},
		// 1203: {msg: 'Walk'},
		// 1204: {msg: 'Curl', startTimer: true, delay: 40000, timerMsg: 'Curl soon...'}, // every ~45s
		// 1205: {msg: 'Dive'},
		// 1206: {msg: 'Backstep'},
		// 13??: {msg: 'Plague/regress', startTimer: true, delay: 55000, timerMsg: 'Plague/regress soon...'}, // Great ones, every ~60s
		// 1305: {msg: 'Staggered'},
	}
},
DW = {
	46601: {
		105: {txt: '跳跃(晕)'},
		106: {txt: '尾气(击退)'},
		109: {txt: '前砸(晕)'},
		110: {txt: '甩尾(毒)'},
		// 鉴定 - 计算总圈数(双数为蓝/单数为红)
		311: {txt: '↓↓ 出(红) ↓↓'}, // 王-红buff
		315: {txt: '↓↓ 出(红) ↓↓'}, // 王-红buff
		313: {txt: '↓↓ 出(蓝) ↓↓'}, // 王-蓝buff
		317: {txt: '↓↓ 出(蓝) ↓↓'}, // 王-蓝buff
		// 相同进圈 不同出圈
		312: {txt: '↑↑ 进(红) ↑↑'}, // 王-红buff
		316: {txt: '↑↑ 进(红) ↑↑'}, // 王-红buff
		314: {txt: '↑↑ 进(蓝) ↑↑'}, // 王-蓝buff
		318: {txt: '↑↑ 进(蓝) ↑↑'}  // 王-蓝buff
	},
	46602: {
		113: {txt: '激光!!'},
		116: {txt: '群体拉人'},
		// 217 蓝圈x1次伤害
		223: {txt: '红圈x2次伤害'},
		309: {txt: '↑↑ 进 ↑↑ (蓝球)'},
		310: {txt: '↑↑ 进 ↑↑ (红球)'},
		// 311: {txt: '↑↑ 进(蓝) ↑↑'}, // 王举 蓝球
		// 313: {txt: '↓↓ 出(蓝) ↓↓'},
		// 314: {txt: '↑↑ 进(红) ↑↑'}, // 王举 红球
		// 312: {txt: '↓↓ 出(红) ↓↓'},
		//////////////////////////////
		303: {tip: '打投掷: '}
	},
	//                   466050   466051   466052             466054    466055    466056
	TipMsg: ["Next -> ", "蓝+白", "红+蓝", "红+白", "全部!!", "红(逆)", "白(逆)", "蓝(逆)"]
},
ML = {
	1000: {
		// 105 跳跃(击倒)
		// 106 扔球(点名)
		// 109 跳扑(点名) 0 1 2
		107: {txt: '砸地板(AOE)'},
		1201: {txt: '怒吼(眩晕)'},
		// 1307: {txt: "有炸弹远离"},
		// 1304 啊很烦吗(鉴定)
		//////////////////////////////
		3213: {tip: ["假·毒圈", "真·破盾"]}, // 护盾-真假
		// 3201: {txt: '真-护盾'},
		// 3208: {txt: '假-护盾(远离)'},
		3212: {tip: ["假·靠近", "真·← 出圈 →"]}, // 杀所有人-真假
		// 3202: {txt: '真 ↓出圈↓'},
		// 3203: {txt: '假 ↑进圈↑'},
		3218: {tip: ["假·靠近", "真·← 远离 →"]}  // 3219 杀1人-真假
		// 1309: {txt: '真 ↓出圈↓'},
		// 1311: {txt: '假 ↑进圈↑'},
	}
},
TS = {
	1000: {},
	1001: {},
	1002: {},
	1003: {
		// 1101 普攻
		// 2101 普攻
		// 1102 旋转
		// 2102 旋转
		1103: {txt: 'AOE-旋风'},
		2103: {txt: 'AOE-旋风'},
		// 1104 前拍
		// 2104 前拍
		1105: {txt: '前拍_后夹'},
		2105: {txt: '前夹_后夹'},
		// 1106 被击倒动作
		// 2106 被击倒动作
		1107: {txt: '左半扫'},
		2107: {txt: '左半扫'},
		1108: {txt: '右半扫'},
		2108: {txt: '右半扫'},
		1109: {txt: '喷射(点名)'},
		2109: {txt: '喷射(点名)'},
		// 1110 抓人动作
		// 2110 抓人动作
		// 1111 抓人
		// 2111 抓人
		// 1112 吸人动作
		// 2112 吸人动作
		// 1201 晕眩动作
		// 2201 晕眩动作
		3101: {txt: '甜甜圈(2)'},
		// 3102: {txt: '前砸'},
		// 3103: {txt: '秒杀机制'}, // 01:07
		3104: {txt: '出笼!!(10s后秒杀)', timeout: 20000}, // 00:27
		3108: {txt: '内->外 扩散圈'},
		3110: {txt: '群体拉人'}
		// 3120 灭团动作
		
		// 905621 法羅納的身上的太陽力量暴走。
		// 905622 法羅納的身上的惡魔力量暴走。
		// 905623 法羅納的身上的女神力量暴走。
		
		// 905624 太陽力量被融合了。
		// 905625 惡魔力量被融合了。
		// 905626 女神力量被融合了。
		
		// 905614 太陽石版上發出光芒。
	},
	300: {
		101: {txt: '对齐-恶魔(顺)'},
		102: {txt: '对齐-太阳(逆)'},
		103: {txt: '对齐-女神(顺)'}
	},
	301: {},
	302: {},
	303: {}
},
FI = {
	TipMsg: ["诅咒x1 | 内外圈", "诅咒x2", "小心激光!"],
	1001: {
		1104: {txt: '大跳(眩晕)'},
		2104: {txt: '大跳(眩晕)'},
		1106: {txt: '旋转攻击'},
		2106: {txt: '旋转攻击'},
		3107: {txt: '点名(前方击退)'}
	},
	1004: {
		1104: {txt: '大跳(眩晕)'},
		2104: {txt: '大跳(眩晕)'},
		1106: {txt: '旋转攻击'},
		2106: {txt: '旋转攻击'},
		3107: {txt: '点名(前方击退)'}
	},
	1002: {
		3101: {txt: '跳跃(击退)'},
		3102: {txt: '黄圈x5(闪避)'},
		3104: {txt: '全屏攻击!!'},
		3105: {txt: '拉拢 | 推开'},
		3107: {txt: '毒圈x1(闪避)'}
	},
	1005: {
		3101: {txt: '跳跃(击退)'},
		3102: {txt: '黄圈x5(闪避)'},
		3104: {txt: '全屏攻击!!'},
		3105: {txt: '拉拢 | 推开'},
		3107: {txt: '毒圈x1(闪避)'}
	},
	1003: {
		1101: {txt: '← 扩散 →'},
		2101: {txt: '← 扩散 →'},
		1102: {txt: '→ 拉拢 ←'},
		2102: {txt: '→ 拉拢 ←'},
		// 1106 前方导弹 2106 前方导弹
		// 1107 后方导弹 2107 后方导弹
		// 1108 右方导弹 2108 右方导弹
		// 1109 左方导弹 2109 左方导弹
		1110: {txt: '↓↓ 雷电 ↓↓'},
		2110: {txt: '↓↓ 雷电 ↓↓'},
		3105: {txt: '点名(闪避)'},
		3108: {txt: '诅咒x2'},
		3109: {txt: '地毯鉴定'}
	}
},
HH = {
	// 1100红龙 - 炎火的煞布诺克
	// 1101黄龙 - 大地的煞雷奥斯
	1101: {
		115: {txt: '3连拍(黄龙)'},
		505: {txt: '石化(闪避)'},
		// 902: {txt: '全力破盾'},
	},
	// 1102黑龙 - 暗黑的窟拉德林
	// 1103白龙 - 暴风的阿加雷斯
	// P2_1
	1000: {
		// 101
		102: {txt: '右抓3连击'},
		103: {txt: '前砸_后砸'},
		104: {txt: '左手拍_后拉'}, // 108 左后拉
		105: {txt: '右手拍_后拉'}, // 109 右后拉
		106: {txt: '头捶(冲击波)'},
		107: {txt: '大跳'},
		// 110
		111: {txt: '后踩(双脚)'},
		112: {txt: '左后方-喷火'},
		113: {txt: '右后方-喷火'},
		114: {txt: '顺时针-喷火'},
		115: {txt: '顺时针转身'},
		116: {txt: '逆时针转身'},
		117: {txt: '右抓_左尾甩'},
		120: {txt: '左抓_左尾甩'},
		119: {txt: '右抓_右尾甩'},
		118: {txt: '左抓_右尾甩'},
		121: {txt: '正面 [龙炎吐息]'},
		122: {txt: 'AOE爆炸(出圈)'},
		123: {txt: 'AOE爆炸(进圈)'},
		// 124
		// 125
		// 126
		// 127
		// 128
		129: {txt: '逆时针-喷火'},
		130: {txt: '左抓_右抓_跳'},
		131: {txt: '右抓_左抓_跳'},
		132: {txt: '左抓_右抓_跳'},
		// 201 202 203 204 205
		// 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517
		502: {txt: '全体撤离(跑远)'},
		516: {txt: '全屏攻击!'},
		901: {txt: '~ 起飞 ~'},
		// 901 902 903 904 905 906 907 908 
		909: {txt: '召唤火葬板'},
		// 910 911
		912: {txt: '开场咆哮(击退)'}
	},
	// P2_2
	2000: {},
	// P3
	3000: {
		// 101 右侧拍地'
		// 102 左侧拍地'
		// 103 ← 左抓 | 右拍
		// 104 左拍 | 右抓 →
		// 105 双手拍地
		106: {txt: '熔岩(靠边)'},
		107: {txt: '双脚破盾!!'},
		108: {txt: '找坦格挡'},
		// 109 顺时针 - 喷火
		// 110 逆时针 - 喷火
		// 113 (未使用)咆哮
		114: {txt: '←← 左横扫'},
		115: {txt: '右横扫 →→'},
		// 131
		132: {txt: '左冰 | 右火'},
		// 133
		134: {txt: '黑 | 红 (搬家)'},
		135: {txt: '红 | 黑 (搬家)'},
		136: {txt: '←← 左横扫'}, // (强力)
		137: {txt: '右横扫 →→'}, // (强力)
		
		// 501 坦满6层全屏炸
		// 502 ?
		// 503 龙炎吐息(后方入口封锁)
		//////////////////////////////
		111: {tip: ["黑 | 红 (Buff)", "红 | 黑 (Buff)"]} // 更新debuff
	},
	4000: {},
	TipMsg: [
		"属|性|墙",
		
		`<font color="#FF0000">→ 火墙·右 →</font>`, // 3001 3005 右
		`<font color="#FF0000">← 火墙·左 ←</font>`, // 3002 3006 左
		`<font color="#FF0000">↓ 火墙·下 ↓</font>`, // 3105 3107 后
		`<font color="#FF0000">↑ 火墙·上 ↑</font>`, // 3106 3108 前
		
		`<font color="#FF0000">打红球</font>`, // 3016 3020
		`打黑球`, // 3017 3021
	]
},
DF = {
	46704: {
		205: {txt: '击退(慢慢慢)'},
		218: {txt: '击退'},
		211: {txt: '<-- 扩散 -->'},
		212: {txt: '--> 收缩 <--'},
		219: {txt: '内外同时'}
	}
},
RM = {
	1000: {
		107: {txt: '前喷(坦)'},
		206: {txt: '跳劈(晕)'},
		//////////////////////////////
		306: {tip: ["↓↓ 出 ↓↓", "↑↑ 进 ↑↑"]}, // 鉴定-红
		307: {tip: ["↓↓ 出 ↓↓", "↑↑ 进 ↑↑"]}, // 鉴定-蓝
	},
	2000: {
		106: {txt: '插地(眩晕)'},
		111: {txt: '连续攻击(不可挡)'}
	},
	3000: {
		// 102 101 103     后喷
		103: {txt: '后喷(打手)'},
		// 101 102 104 105 不推 // 101 102 104 106 107 推坦
		106: {txt: '前推(坦)'},
		110: {txt: '尾巴横扫!!'}, // 108 110 111
		// 317 分散吃球
		// 319 分散吃球 愤怒
		113: {txt: '↓↓ 出 ↓↓'}, // 113  114 115
		116: {txt: '↑↑ 进 ↑↑'}, // 116  117 118
		311: {txt: '蓄力推人!!'}, // < 30%
		322: {txt: `<font color="#FF0000">命运!!(补师驱散)</font>`}
	}
},
VS = {
	1000: {
		301: {txt: '全体沉默'},
		304: {txt: '内外圈'},
		401: {txt: '右挥刀→→→ →→ →'},
		402: {txt: '← ←← ←←←左挥刀'}
	},
	2000: {
		106: {txt: '↓ 后砸 ↓'},
		108: {txt: '↑ 前砸 ↑'},
		131: {txt: '右挥刀→→→ →→ →'},
		130: {txt: '← ←← ←←←左挥刀'},
		134: {txt: '注视(近)'},
		502: {txt: '蓄力一击(击退)'}
	},
	3000: {
		116: {txt: '前盾砸(晕坦) or 甜甜圈(击飞)'},
		136: {txt: '点三抓名'},
		// 138: {txt: '滚开!!'},
		144: {txt: '↓↓ 出 ↓↓'},
		145: {txt: '↑↑ 进 ↑↑'},
		149: {txt: '前刺(闪)'},
		151: {txt: '砸地_点名'},
		152: {txt: '前砸_后踢'},
		701: {txt: '后扫_前刺(闪)'},
		401: {txt: '驱散!!'},
		402: {txt: '晕王!!'},
		3301: {txt: '炸弹(集)_净化'},
		3302: {txt: '炸弹(集)_加血'},
		3103: {txt: '闪电(分)'},
		3105: {txt: '闪电(集)'},
		3404: {txt: '注视(近)'},
		3405: {txt: '注视(远)'}
	},
	TipMsg: ["Next -> ", "注(近x2)", "电(分散)", "炸(净化)", "注(远x2)", "电(集中)", "炸(加血)"]
},
RK = {
	1000: {
		104: {txt: '前夹(晕坦)'},
		112: {txt: '后砸'},
		304: {txt: '↓↓ 出 ↓↓'},
		305: {txt: '↑↑ 进 ↑↑'},
		306: {txt: '拆炸弹!!'},
		307: {txt: '拉人(群体)'},
		309: {txt: '跳跳跳!!', timeout: 12000},
		// 上级披萨鉴定
		315: {txt: '↑↗ 前右'}, // 1
		319: {txt: '↑↗ 前右'},
		311: {txt: '↗↗ 右上'}, // 2
		323: {txt: '↗↗ 右上'},
		312: {txt: '↘↘ 右下'}, // 3
		324: {txt: '↘↘ 右下'},
		316: {txt: '↓↘ 后右'}, // 4
		320: {txt: '↓↘ 后右'},
		313: {txt: '↙↓ 后左'}, // 5
		321: {txt: '↙↓ 后左'},
		317: {txt: '↙↙ 左下'}, // 6
		325: {txt: '↙↙ 左下'},
		318: {txt: '↖↖ 左上'}, // 7
		322: {txt: '↖↖ 左上'},
		314: {txt: '↖↑ 前左'}, // 8
		326: {txt: '↖↑ 前左'}
	},
	2000: {
		102: {txt: '前砸(中毒)'},
		108: {txt: '后喷(击退)'},
		105: {txt: '旋转(击退)'},
		// 上级
		305: {txt: '吸附(靠近)'},
		304: {txt: '爆炸(远离)!!'},
		// 暴走
		310: {txt: '外->内->外闪'},  // 3034202
		311: {txt: '内->外闪->内'}   // 3034203
	},
	3000: {
		117: {txt: '←← 左手S拳 ←←'}, // 117 121 123
		118: {txt: '←← 左手S拳 ←←'}, // 118 121 123
		116: {txt: '→→ 右手S拳 →→'}, // 116 120 122
		119: {txt: '→→ 右手S拳 →→'}, // 119 120 122
		128: {txt: '火箭拳'}, // 128 129 火箭拳
		130: {txt: '后喷'},   // 130 131 后喷
		321: {txt: '破盾!!'},
		323: {txt: '雷达!!'},
		324: {txt: '内圈眩晕'}
		// 305 鉴定
	},
	TipMsg: ["Next -> ", "近", "远", "全"]
},
RR = {
	2000: {
		119: {txt: '前喷'},
		120: {txt: '后喷'}
	},
	3000: {
		115: {txt: '怒吼(眩晕)!!'},
		175: {txt: '真·怒吼(眩晕)'},
		201: {txt: '真·面目(闪避)'}
	}
},
AA = {
	1000: {
		116: {txt: '↓↓ 出 ↓↓'},
		117: {txt: '↑↑ 进 ↑↑'},
		300: {txt: '~我要飞得更高~'}
	},
	2000: {
		119: {txt: '诅咒!!'}
	},
	3000: {
		113: {txt: '前砸 | 后砸'},
		202: {txt: '后撤 | 转圈'},
		109: {txt: '右挥刀→→→ →→ →'},
		111: {txt: '← ←← ←←←左挥刀'},
		310: {txt: '水波_310'},
		311: {txt: '水波_311'},
		312: {txt: '水波_312'},
		313: {txt: '水波_313'},
		314: {txt: '水波_314'},
		400: {txt: '幻影x3 剑气'}, // 三幻影-剑气 205 500 400 204 204
		401: {txt: '幻影x3 转圈'}, // 三幻影-转圈 205 500 401 115 309
		//////////////////////////////
		104: {tip: '后砸(眩晕)'}
	}
},
DRC = {
	TipMsg: `<font color="#FF0000">100%能量!!</font>`,
	1000: {
		108: {txt: '后跳(眩晕)'},
		109: {txt: '后扫(击退)'},
		119: {txt: '蓄力捶地'},
		127: {txt: '雷电!!'}
	},
	2000: {
		105: {txt: '点名(击飞)'},
		110: {txt: '前砸(闪避)'},
		111: {txt: '右后踢(击退)'},
		115: {txt: '左后踢(击退)'},
		119: {txt: '跳跃(眩晕)'},
		120: {txt: '前拳_后踢(击退)'},
		316: {txt: '火焰(爆炸)'},
		317: {txt: '水波(击飞)'},
		318: {txt: '地毯(眩晕)'}
	},
	3000: {
		106: {txt: '前推(击退)'},
		109: {txt: '前插(眩晕)'},
		112: {txt: '后扫(击退)'},
		301: {txt: '地刺(击飞)'},
		303: {txt: '→→→→ 右'},
		306: {txt: '左 ←←←←'},
		309: {txt: '注视!!'},
		315: {txt: '恐惧(吸血)'}
	}
},
DC = {
	1000: {
		106: {txt: '前推(击退)'},
		110: {txt: '前插(眩晕)'},
		// 122 123 124
		124: {txt: 'AOE(闪避)'},
		125: {txt: '后跳(眩晕)'},
		126: {txt: '前跳(击退)'},
		130: {txt: '后空翻(晕)'}, // 129 130
		340: {txt: '口气(石化)'}
	}
},
GLS = {
	1000: {
		106: {txt: '重击(坦)'},
		107: {txt: '后喷(击退)'},
		109: {txt: '滚石(小)'},
		110: {txt: '滚石(大)'},
		116: {txt: '全屏攻击!!'},
		301: {txt: '食人花(眩晕)'},
		307: {txt: '笼子(禁锢)'},
		309: {txt: '1朵花-鉴定!!'},
		310: {txt: '2朵花-鉴定!!'},
		312: {txt: '金色花!!'}
	},
	2000: {
		105: {txt: '翻滚'},
		113: {txt: '双手(眩晕)'},
		114: {txt: '三连地板(靠近)'},
		116: {txt: '前后砸'},
		301: {txt: '捶地(出)_旋转(击退)'},
		302: {txt: '旋转(进)_捶地(击飞)'}
	},
	3000: {
		139: {txt: '←← 王-左侧安全(顺)'}, // 151 139
		150: {txt: '←← 王-左侧安全(顺)'}, // 151 150
		141: {txt: '(逆)王-右侧安全 →→'}, // 153 141
		152: {txt: '(逆)王-右侧安全 →→'}, // 153 152
		118: {txt: '三连击(左|右|喷)'},
		// 143: {txt: '左后-电击'},
		// 145: {txt: '左后-电击'},
		146: {txt: '左后 ← 电击(扩散)'},
		154: {txt: '左后 ← 电击(扩散)'},
		// 144: {txt: '电击-右后'},
		// 147: {txt: '电击-右后'},
		148: {txt: '电击(扩散) → 右后'},
		155: {txt: '电击(扩散) → 右后'},
		161: {txt: '后砸 | 前砸'},
		162: {txt: '后砸 | 前砸'},
		213: {txt: '尾巴!!'},
		215: {txt: '尾巴!!'},
		300: {txt: '一次觉醒(推人)'},
		399: {txt: '二次觉醒(推人)'},
		360: {txt: '爆炸!! 闪避!!'}
	},
	TipMsg: `<font color="#FF0000">4层 即将爆炸!!</font>`,
},
BS = {
	1000: {
		103: {txt: '前砸(闪避)'},
		108: {txt: '丢锤(眩晕)'},
		111: {txt: '后砸(慢慢慢慢)'},
		// 137 后砸
		139: {txt: '转圈(击倒)'},
		131: {txt: '左-范围(挡)_后拉'}, // 131 132 134
		125: {txt: '右-前砸(闪)_后拉'}, // 125 126 127
		101: {txt: '锤地->270->重击'}, // 101 105
		114: {txt: '捶地(秒杀)'}, // 113 114
		115: {txt: '高尔夫_115'},
		138: {txt: '高尔夫_138'},
		116: {txt: '甜甜圈'},
		117: {txt: '跳扑 -> 随仇'},
		118: {txt: '跳扑(坦)'},
		112: {txt: '完美格挡'},
		135: {txt: '完美格挡'},
		121: {txt: '左  (4连半月)', tip: '四连半月(就绪)'},
		122: {txt: '左  第3下加速', tip: '四连半月(就绪)'},
		123: {txt: '左  第2下加速', tip: '四连半月(就绪)'},
		140: {txt: '右  (4连半月)', tip: '四连半月(就绪)'},
		141: {txt: '右  第3下加速', tip: '四连半月(就绪)'},
		142: {txt: '右  第2下加速', tip: '四连半月(就绪)'}
	},
	2000: {
		103: {txt: '前砸(闪避)'},
		108: {txt: '丢锤(眩晕)'},
		111: {txt: '后砸(慢慢慢慢)'},
		// 137: {txt: '后砸(闪避)'},
		139: {txt: '转圈(击倒)'},
		131: {txt: '左-范围(挡)_后拉'}, // 131 132 134
		125: {txt: '右-前砸(闪)_后拉'}, // 125 126 127
		101: {txt: '锤地->270->重击'}, // 101 105
		114: {txt: '捶地(秒杀)'}, // 113 114
		115: {txt: '高尔夫_115'},
		138: {txt: '高尔夫_138'},
		116: {txt: '甜甜圈'},
		117: {txt: '跳扑 -> 随仇'},
		118: {txt: '跳扑(坦)'},
		112: {txt: '完美格挡'},
		135: {txt: '完美格挡'},
		121: {txt: '左  (4连半月)', tip: '四连半月(就绪)'},
		122: {txt: '左  第3下加速', tip: '四连半月(就绪)'},
		123: {txt: '左  第2下加速', tip: '四连半月(就绪)'},
		140: {txt: '右  (4连半月)', tip: '四连半月(就绪)'},
		141: {txt: '右  第3下加速', tip: '四连半月(就绪)'},
		142: {txt: '右  第2下加速', tip: '四连半月(就绪)'},
		
		119: {txt: '← ←← ←←←左挥刀'},
		120: {txt: '右挥刀→→→ →→ →'},
		311: {txt: '补师开盾'},
		312: {txt: '补师开盾'},
		308: {txt: '第1次晕'},
		309: {txt: '第2次晕'},
		310: {txt: '第3次晕'}
	},
	2500: {
		1305: {txt: `<font color="#FF0000">红眼射线(秒杀)</font>`}
	},
	TipMsg: `以<font color="#FF0000">[暈眩技能]</font>阻止 震怒的暴風施展`
},
GV = {
	1000: {
		124: {txt: '前砸'},
		104: {txt: '(慢) 前砸'},
		133: {txt: '跳扑'},
		113: {txt: '(慢) 跳扑'},
		138: {txt: '跳扑'},
		118: {txt: '(慢) 跳扑'},
		// 147 向前连续攻击
		149: {txt: '左手蓄力(击飞)'},
		148: {txt: '右手蓄力(击飞)'},
		
		127: {txt: '|直线后喷|'},
		107: {txt: '(慢) |直线后喷|'},
		131: {txt: '后喷'},
		111: {txt: '(慢) 后喷'},
		132: {txt: '← 左右喷射 →'},
		112: {txt: '(慢) ← 左右喷射 →'},
		139: {txt: '↑ 前后喷射 ↓'},
		119: {txt: '(慢) ↑ 前后喷射 ↓'},
		314: {txt: '内外圈'},
		313: {txt: '(慢) 内外圈'},
		
		305: {txt: 'Pizza'}, // 143 // 145
		312: {txt: '全屏(击退)'},
		311: {txt: '(慢) 全屏(击退)'}
	},
	2000: {
		105: {txt: '前刺'}, // 104 105
		109: {txt: '闪避(慢慢慢)'},
		108: {txt: '前插_后喷'},
		228: {txt: '补师加血'},
		227: {txt: '爆炸(闪避)!!'},
		230: {txt: '花粉爆炸', timeout: 1500},
		231: {txt: '↓↓ 出 ↓↓'},
		232: {txt: '↑↑ 进 ↑↑'},
		235: {txt: '注视!!'},
		236: {txt: '点名(前方击退)'}
	}
},
AQ = {
	1000: {
		1104: {txt: '大跳(眩晕)'},
		2104: {txt: '大跳(眩晕)'},
		1110: {txt: '前插(眩晕)'},
		2110: {txt: '前插(眩晕)'},
		1111: {txt: '↓ 左拉'},
		1113: {txt: '↓ 左拉'}, // 1112 1113
		2111: {txt: '↓ 左拉'},
		2113: {txt: '↓ 左拉'}, // 2112 2113
		1112: {txt: '右拉 ↓'},
		1114: {txt: '右拉 ↓'}, // 1111 1114
		2112: {txt: '右拉 ↓'},
		2114: {txt: '右拉 ↓'}, // 2111 2114
		1115: {txt: '后半圈'},
		2115: {txt: '后半圈'},
		1116: {txt: '爆炸(开盾)!!'}, // 1117
		2116: {txt: '爆炸(开盾)!!'}, // 2117
		3107: {txt: '点名(前方击退)'},
		3115: {txt: '旋转攻击'}, // 1106 2106
		3116: {txt: '小圈_旋转攻击'}, // 1106 2106
		//////////////////////////////
		3119: {tip: ["↓↓ 出 ↓↓", "↑↑ 进 ↑↑"]}, // 红出 | 蓝进
		3220: {tip: ["↑↑ 进 ↑↑", "↓↓ 出 ↓↓"]}  // 红进 | 蓝出
	},
	2000: {
		164: {txt: '蓄力反击(流血)'},
		166: {txt: '转身点名'}, // 169 166 前搓 左购拳 右勾拳
		175: {txt: '怒吼(眩晕)!!'},
		178: {txt: '转圈(流血x2)'},
		181: {txt: '插地板(直线)'},
		// 214 插地板x3 181
		182: {txt: '踩地(击倒)'}, // 183 184
		// 302 209 点名-踩地(击倒) 182 183 184
		185: {txt: '爆炸(开盾)!!'},
		202: {txt: '后退_前刺'},  // 177
		207: {txt: '幻影x5(流血)'}, // 204 206 205
		212: {txt: '闪现(流血)'}    // 180
	}
},
SI = {
	1900: {
		104: {txt: '吸蓝(闪避)'}
	},
	1200: {
		103: {txt: '吸蓝(闪避)'}
	},
	2200: {
		108: {txt: '蓄力(晕坦)'},
		128: {txt: '高尔夫(击飞)'},
		129: {txt: '随仇-直线骷髅'},
		135: {txt: "跳绳"},
		204: {txt: "30% 变身"},
		137: {txt: '扩散'},
		139: {txt: '收缩'},
		133: {txt: '扩散(击飞)'},
		//////////////////////////////
		127: {tip: ["后擒_转圈", "后擒_前砸"]},
		121: {tip: '鉴定 '},  // 前砸(外) | 转圈(内) (绿)_来吧  +No.1 buff
		122: {tip: '鉴定 '},  // 转圈(内) | 前砸(外) (紫)_滚开  +No.1 buff
		124: {tip: '前砸'},   // 第一击 / 第二击
		125: {tip: '转圈'},   // 第一击 / 第二击
		123: {tip: '鉴定 '},  // 蓄力前砸 | ↓(外)↓ (绿)_爆炸  +No.2 buff
		120: {tip: '鉴定 '},  // 蓄力转圈 | ↑(内)↑ (紫)_深渊  +No.2 buff
		126: {tip: '大前砸'}, // 第三击
		134: {tip: '大转圈'}  // 第三击
	},
	TipMsg: ["外-内-内", "内-外-内", "闪避!!!", "外-内-外", "内-外-外"]
},
CK = {
	1000: {
		103: {txt: '尾巴(击飞!!)'},
		153: {txt: '尾巴(击飞!!)'},
		108: {txt: '右转(击退!!)'},
		158: {txt: '右转(击退!!)'},
		109: {txt: '左转(击退!!)'},
		159: {txt: '左转(击退!!)'},
		118: {txt: '~ 弹射起步 ~'},
		160: {txt: '~ 弹射起步 ~'},
		137: {txt: '[暴走]凯克·赛克 积蓄力量'},
		138: {txt: '大范围 击退!!'},
		// 139 [温度] 60°全体(火)
		// 140 [温度] 40°全体(冰)
		// 104 AOE-寒冰魔法(大)
		// 154 AOE-寒冰魔法(小)
		// 105 AOE-火焰魔法(大)
		// 155 AOE-火焰魔法(小)
		145: {txt: '双脚_慢(眩晕)'},
		//////////////////////////////
		107: {tip: '换色踩_快速'},
		157: {tip: '换色踩_快速'},
		// 愤怒(异色) / 恐惧(同色)
		212: {tip: ["冰进", "火进"]}, // 212 -> 141逆 内火外冰
		215: {tip: ["冰进", "火进"]}, // 215 -> 144顺 内火外冰
		214: {tip: ["火进", "冰进"]}, // 214 -> 142逆 内冰外火
		213: {tip: ["火进", "冰进"]}  // 213 -> 143顺 内冰外火
	},
	TipMsg: ["↑↑ 进 ↑↑", "↓↓ 出 ↓↓", "诅咒→远", "近←诅咒"]
},
FA = {
	1000: {
		108: {txt: '一刀(慢)'},    // 101 121 122 連續攻擊 -> 108 一刀兩斷(坦)
		355: {txt: '下巴粉碎'},    // 102 121 103 連續攻擊 -> 355 右手蓄力 -> 114 下巴粉碎
		135: {txt: '一刀(慢)'},    //         104 連續攻擊 -> 135 左手蓄力 -> 130 一刀兩斷
		111: {txt: '眩晕 | 一刀'}, //         104 連續攻擊 -> 111 刀背打擊 -> 130 一刀兩斷
		112: {txt: '后跳 | 一刀'}, //     121 102 連續攻擊 -> 112 後退踢擊 -> 130 一刀兩斷
		109: {txt: '前跳 | 一刀'},         // 109 向下劈擊 -> 402 等待     -> 130 一刀兩斷
		
		116: {txt: '完美格挡'},    // 116 斬擊
		140: {txt: '完美格挡'},    // 140 斬擊
		
		145: {txt: '3圈 | 斩击'},  // 145 重擊斬 139 迴旋砍擊x2 -> 140 斬擊
		136: {txt: '2圈 | 一刀'},  // 136 重擊斬 144 迴旋砍擊x1 -> 130 一刀兩斷
		
		141: {txt: '回旋 | 一刀'}, // 141 破壞氣魄+迴旋砍擊x2 -> 146 114 130
		146: {txt: '下巴 | 一刀'}, // 146 一刀兩斷       -> 114 下巴粉碎 -> 130 一刀兩斷
		142: {txt: '回旋 | 下巴'}, // 142 破壞氣魄+迴旋砍擊x2 -> 143 114 130
		143: {txt: '一刀'},        // 143 一刀兩斷(取消) -> 114 下巴粉碎 -> 130 一刀兩斷
		
		151: {txt: '三斩 | 一刀'}, // 151 149 148三斬 -> 130 一刀兩斷
		117: {txt: '瞬闪(点名)'},  //    117 瞬閃点名 -> 130 一刀兩斷
		356: {txt: '瞬闪(点名)'},  //    356 瞬閃点名 -> 147 一刀兩斷
		134: {txt: '要害(转身)'},  //    134 要害攻擊 -> 147 一刀兩斷
		
		357: {txt: '紫-> 爆炸(远离)', tip: '鉴定(就绪)!!'}, // 357 吸收力量 -> 110 起身攻擊 -> 氣斬
		350: {txt: '红-> 甜甜圈',     tip: '鉴定(就绪)!!'},     // 350 吸收力量 -> 302 甜甜圈
		
		351: {txt: '破盾!!'}, // 护盾开始 环形爆发
		401: {txt: '30% 全屏爆炸(闪避)!!', timeout: 1200} // 开始
	}
},
KG = {
	 999: {
		106: {txt: '击退(点名)'},
		// 107 皮鞭(点名)
		119: {txt: 'AOE-击倒(开盾)'},
		120: {txt: '甜甜圈'}
	}
},
DA = {
	1000: {
		// 101 右砍刀->左砍刀
		// 102 十字斩(双手)
		// 103: {txt: '重击', timeout: 2000}, // 右砍刀->左砍刀->双手十字
		// 118 三连(前插) 左砍刀->右砍刀->双手插地
		// 104 左勾手->右勾手
		105: {txt: '前砸(眩晕)'}, // 105 106 右勾手->前砸
		109: {txt: '蓄力(击倒)'},
		119: {txt: '转圈(闪避)', timeout: 300},
		112: {txt: '后喷(击退)'},
		110: {txt: '←←扩散圈→→'},
		114: {txt: '插地板(眩晕)'}, // 120 114
		107: {txt: '随仇->点名'},
		111: {txt: '跳劈'},
		115: {txt: '落雷(集中)'},
		121: {txt: '鉴定-1', timeout: 1500}, // 121 122 123 蓄力->披萨->横扫
		124: {txt: '鉴定-2', timeout: 1500}, // 124 125 126 蓄力->披萨->横扫
		
		127: {txt: '←← 内外 →→'},
		128: {txt: '→→ 外内 ←←'},
		304: {txt: '破盾!!'}
	}
},
UW = {
	1000: {
		108: {txt: '重击斩'}, // 153 连打(普攻) 108 重击斩
		154: {txt: '回旋踢'}, // 153 连打(普攻) 154 回旋踢
		114: {txt: '升天拳(击倒) | 上踢(漂浮)'}, // 153 连打(普攻) 102 (普攻) 114 升天拳(击倒) 113 上踢(漂浮)
		// 115 冲击波(慢) // 116 冲击波(快)
		121: {txt: '飞踢(眩晕)'},
		110: {txt: '回旋击'},
		124: {txt: '回旋飞踢(觉醒技)'},
		129: {txt: '冲击波(扇形)'},
		133: {txt: '飓风连打(击飞)'},
		142: {txt: '后踩(眩晕)'}, // 142 反击 148 后踩(眩晕)
		143: {txt: '正义跳跃'},
		146: {txt: '后踢(击退)'},
		155: {txt: '地面强打(击飞)'},
		302: {txt: '垃圾!! 就这?? (速度破盾!!)'}
		//  303: {txt: '鉴定'}, // 303 -> 117 155 地面强打(近远) /  118 155 地面强打(远近)
		//  304: {txt: '鉴定'}, // 304 -> 118 155 地面强打(远近) /  117 155 地面强打(近远)
		//  313: {txt: '大爆炸'}, // 313 正义跳跃 314 大爆炸
	},
	TipMsg: ["↓↓ 出 ↓↓", "↑↑ 进 ↑↑"]
},
SC = {
	1000: {
		111: {txt: '后扫(流血)'},
		115: {txt: '↑↑ 远离 ↑↑'},
		// 118: {txt: '前方击退'},
		301: {txt: '沉默', timeout: 1200},
		302: {txt: '爆炸(出圈)'},
		304: {txt: '内外 - 甜甜圈'},
		// 308: {txt: '出圈'},
		// 309: {txt: '进圈'},
		801: {txt: '沉默(全体)', timeout: 1200},
		805: {txt: '甜甜圈(内-外-内)'},
		806: {txt: '甜甜圈(外-内-外)'},
		//////////////////////////////
		401: {tip: ['右挥刀→→→ →→ →', '← ←← ←←←左挥刀(怒)']},
		402: {tip: ['← ←← ←←←左挥刀', '(怒)右挥刀→→→ →→ →']}
	}
},
CA = {
	1000: {
		// 103 普攻 115 追击 117 上击 139 下击
		// 119 前突二连
		104: {txt: '插地板', timeout:  200},
		107: {txt: '→→ 地毯 ←←'},
		110: {txt: '标枪(晕)_后喷'},
		125: {txt: '前刺(眩晕)', timeout:  200},
		112: {txt: '前喷(击退)', timeout: 1100},
		120: {txt: '三连击(晕)', timeout: 2100},
		123: {txt: '转圈(流血)'},
		//////////////////////////////
		114: {tip: '前空翻'},
		116: {tip: '←← 地毯 →→'},
		127: {tip: '逆 127'}, // 逆时针转
		128: {tip: '顺 128'}, // 顺时针转
		148: {tip: '后方_前方'}
		// 156 灵魂 | 157 158 必杀技-蓄力 159 必杀技-转圈
		// 122 灭团动作
		// 155 projectile 点名 一字地毯
		// 161 projectile 点名 十字地毯 上级
		// 160 projectile 灵魂球
		// 162 163 <-闪退->
		// 202 登场动作 200 201 null
	}
},
GT = {
	1000: {
220: {txt: '220_甜甜圈 内->外'},
221: {txt: '221_甜甜圈 外->内'},
212: {txt: '[右手蓄力] 红buff'},
215: {txt: '[右手蓄力] 蓝buff'},
		// 101 102 [连续攻击]一段
		// 103 104 [连续攻击]二段
		// 108 [前进横劈] [打击大地]
		// 109 [向下劈擊]
		// 105 111 [打击大地]
		106: {txt: '←←击退→→'}, // [连续攻击]
		201: {txt: '前砸(击倒)'}, // [聚力之击x1]
		209: {txt: '<font color="#FF0000">(击晕王) ↓聚力↓</font>'},
		// 209红buff | 202[聚力之击x2] | 203[聚力之击x3] | 204[聚力之击x3]下砸
		210: {txt: '<font color="#FF0000">(击晕王) ←龙卷→</font>'},
		// 210蓝buff | 206[前龙卷风x5] | 207[前龙卷风x5]上挑
		512: {txt: '后·龙卷风'}, // 511转身[震慑] | 205[后龙卷风]x2圈
		// 506 515 寒气注视
		508: {txt: '甜甜圈 内->外'}, // 右手红拳
		516: {txt: '甜甜圈 内->外'}, // 右手红拳
		509: {txt: '甜甜圈 外->内'}, // 右手蓝拳
		517: {txt: '甜甜圈 外->内'}, // 右手蓝拳
		/** --暴走开始-- 505->502 | 520->518 | 521->519 **/
		// 301 302 左砍 | 303 304 右砍 | 309 310 双手重击
		311: {txt: '[双手重击]'},
		// 305 [蓄力被打断]
		306: {txt: '[原地转圈]'}, // 306 蓄力 | 307原地转圈 | 308转圈结束
		// 321 322 324 冰震
		// 323 325 点名 二连击
		316: {txt: '[十字斩]', timeout: 500} // 313下蹲 | 314[野兽突进]冲锋 | 316[野兽突进]冲锋_双手砍 | 318[双手连击]十字斩
		// 315 317 左右砍
		// 312 319 冲锋 左右砍
		/** --暴走结束-- 320 **/
		// 208 [蓄力移动]
		// 211 [强袭攻击] 冲锋->打击
		// 213 [紧急回避] 前滚翻
		// 216 [紧急回避] 前滚翻
		// 214 [全神一击] 击飞
		// 217 [全神一击] 击飞
		// 501 510 513 514 [不灭的狂战士] 无敌buff
		// 503 灭团动作
		// 507 抓人动作
	},
	1002: {
		104: {txt: '发射体A'},
		105: {txt: '发射体B'},
		108: {txt: '发射体C'},
		//////////////////////////////
		106: {tip: '←←前方发射体攻击A→→'},
		107: {tip: '←←前方发射体攻击B→→'},
		109: {tip: '←←前方发射体攻击C→→'}
	},
	TipMsg: ["诅咒→远", "近←诅咒"]
},
FL = {
	1000: {
		// 101 挥舞攻击
		
		102: {txt: '↓左拉↓'},
		
		// 103 上勾拳
		104: {txt: '上勾拳 | 下砸'},
		
		105: {txt: '前插(眩晕)'},
		106: {txt: '前插(眩晕) | 外拉'},
		
		107: {txt: '大风车(旋转攻击)'},
		
		108: {txt: '前冲拳'},
		
		109: {txt: '白激光'},
		113: {txt: '黑激光'},
		
		114: {txt: '↓后方-激光喷射↓'},
		
		110: {txt: '后插刀锋(小)'},
		111: {txt: '后插刀锋(中)'},
		112: {txt: '后插刀锋(大)'},
		
		115: {txt: '黑-甜甜圈(内->外)'},
		116: {txt: '红-甜甜圈(外->内)'},
		
		// 117: {txt: '脚踢'},
		118: {txt: '蓄力脚踢'},
		
		119: {txt: '前抓 | 横扫'},
		
		120: {txt: '能量聚集'},
		
		121: {txt: '红-爆炸'},
		122: {txt: '蓝-爆炸'},
		
		// 123 破盾失败
		// 124 显示异常状态
		
		// 304 刀刃落下（红色）事前动作
		// 305 刀刃落下（蓝色）事前动作
		
		306: {txt: '破盾'}
		
		// 307 突发事件1
		// 308 突发事件2
		// 309 突发事件3
		// 310 晕眩动作
	}
}

module.exports = {
	// Dreadspire
	9034: {Zone: DR, String: `${into} <font color="#56B4E9">殘酷幻影之塔</font>`},
	// Demon's Wheel
	9066: {Zone: DW, String: `${into} <font color="#56B4E9">岱魔鲁斯的轮盘</font>`},
	// Manglemire
	9070: {Zone: ML, String: `${into} <font color="#56B4E9">吹牛王塔勒斯基的游乐场</font>`},
	// Timescape - Normal - Hard
	9756: {Zone: TS, String: `${into} <font color="#56B4E9">法罗拉时空</font> ${MODE[1]}`},
	9056: {Zone: TS, String: `${into} <font color="#56B4E9">法罗拉时空</font> ${MODE[2]}`},
	// Forsaken Island - Normal - Hard
	9059: {Zone: FI, String: `${into} <font color="#56B4E9">伯恩斯坦恶灵岛</font> ${MODE[1]}`},
	9759: {Zone: FI, String: `${into} <font color="#56B4E9">伯恩斯坦恶灵岛</font> ${MODE[2]}`},
	// Demokron Factory - Normal - Hard
	9767: {Zone: DF, String: `${into} <font color="#56B4E9">费勒诺的实验室</font> ${MODE[1]}`},
	9067: {Zone: DF, String: `${into} <font color="#56B4E9">费勒诺的实验室</font> ${MODE[2]}`},
	// Harrowhold - P1 - P2 - P3 - P4
	9950: {Zone: HH, String: `${into} <font color="#56B4E9">破坏的神界关口</font>`},
	// Ruinous Manor - Normal - Hard
	9770: {Zone: RM, String: `${into} <font color="#56B4E9">拉坎里斯的废墟</font> ${MODE[1]}`},
	9970: {Zone: RM, String: `${into} <font color="#56B4E9">拉坎里斯的废墟</font> ${MODE[2]}`},
	// Velik's Sanctuary - Normal - Hard
	9781: {Zone: VS, String: `${into} <font color="#56B4E9">贝里克神殿</font> ${MODE[1]}`},
	9981: {Zone: VS, String: `${into} <font color="#56B4E9">贝里克神殿</font> ${MODE[2]}`},
	// RK-9 Kennel - Normal - Hard - Rampaging
	9735: {Zone: RK, String: `${into} <font color="#56B4E9">RK-9机库</font> ${MODE[1]}`},
	9935: {Zone: RK, String: `${into} <font color="#56B4E9">RK-9机库</font> ${MODE[2]}`},
	3034: {Zone: RK, String: `${into} <font color="#56B4E9">RK-9机库</font> <font color="#FF0000">暴走</font>`},
	// Red Refuge - Normal - Hard
	9739: {Zone: RR, String: `${into} <font color="#56B4E9">革命团总部</font> ${MODE[1]}`},
	9939: {Zone: RR, String: `${into} <font color="#56B4E9">革命团总部</font> ${MODE[2]}`},
	// Antaroth's Abyss - Normal - Hard - 7-person - Guide
	9720: {Zone: AA, String: `${into} <font color="#56B4E9">安塔洛斯的深渊</font> ${MODE[1]}`},
	9920: {Zone: AA, String: `${into} <font color="#56B4E9">安塔洛斯的深渊</font> ${MODE[2]}`},
	3017: {Zone: AA, String: `${into} <font color="#56B4E9">安塔洛斯的深渊</font> ${MODE[3]}`},
	3029: {Zone: AA, String: `${into} <font color="#56B4E9">安塔洛斯的深渊</font> ${MODE[4]}`},
	// Dark Reach Citadel - Normal - Hard - 7-person
	9783: {Zone: DRC, String: `${into} <font color="#56B4E9">泰内布利斯城堡</font> ${MODE[1]}`},
	9983: {Zone: DRC, String: `${into} <font color="#56B4E9">泰内布利斯城堡</font> ${MODE[2]}`},
	3018: {Zone: DRC, String: `${into} <font color="#56B4E9">泰内布利斯城堡</font> ${MODE[3]}`},
	// Damned Citadel - Stormed Citadel
	3041: {Zone: DC, String: `${into} <font color="#56B4E9">泰内布利斯城堡</font> <font color="#FF0000">诅咒</font>`},
	3044: {Zone: DC, String: `${into} <font color="#56B4E9">泰内布利斯城堡</font> <font color="#FF0000">蠶食</font>`},
	// Grotto of Lost Souls - Normal - Hard - 7-person - Guide
	9782: {Zone: GLS, String: `${into} <font color="#56B4E9">里安的地下殿堂</font> ${MODE[1]}`},
	9982: {Zone: GLS, String: `${into} <font color="#56B4E9">里安的地下殿堂</font> ${MODE[2]}`},
	3019: {Zone: GLS, String: `${into} <font color="#56B4E9">里安的地下殿堂</font> ${MODE[3]}`},
	3028: {Zone: GLS, String: `${into} <font color="#56B4E9">里安的地下殿堂</font> ${MODE[4]}`},
	// Bahaar's Sanctum - P1 -P2 - Guide
	9044: {Zone: BS, String: `${into} <font color="#56B4E9">巴哈勒神殿</font>`},
	3037: {Zone: BS, String: `${into} <font color="#56B4E9">巴哈勒神殿</font> ${MODE[4]}`},
	// Gossamer Vault - Normal - Hard - Guide
	3101: {Zone: GV, String: `${into} <font color="#56B4E9">费尔奎娜巢穴</font> ${MODE[1]}`},
	3201: {Zone: GV, String: `${into} <font color="#56B4E9">费尔奎娜巢穴</font> ${MODE[2]}`},
	3033: {Zone: GV, String: `${into} <font color="#56B4E9">费尔奎娜巢穴</font> ${MODE[4]}`},
	// Akalath Quarantine - Normal - Guide
	3023: {Zone: AQ, String: `${into} <font color="#56B4E9">贝尔亚克城堡</font>`},
	3032: {Zone: AQ, String: `${into} <font color="#56B4E9">贝尔亚克城堡</font> ${MODE[4]}`},
	// Sea of Honor
	3020: {Zone: SI, String: `${into} <font color="#56B4E9">金鳞号</font>`},
	// Corrupted Skynest - Normal - Hard
	3026: {Zone: CK, String: `${into} <font color="#56B4E9">凯尔赛克隐藏地</font> ${MODE[1]}`},
	3126: {Zone: CK, String: `${into} <font color="#56B4E9">凯尔赛克隐藏地</font> ${MODE[2]}`},
	// Forbidden Arena [Hagufna]
	3027: {Zone: FA, String: `${into} <font color="#56B4E9">狂气[不灭的斗士]</font>`},
	// Kezzel's Gorge (5-Person)
	9053: {Zone: KG, String: `${into} <font color="#56B4E9">巨人深林 [5人]</font>`},
	// Draakon Arena - Normal - Hard
	3102: {Zone: DA, String: `${into} <font color="#56B4E9">司令官修炼场</font> ${MODE[1]}`},
	3202: {Zone: DA, String: `${into} <font color="#56B4E9">司令官修炼场</font> ${MODE[2]}`},
	// Forbidden Arena [Undying Warlord] [Nightmare Undying Warlord]
	3103: {Zone: UW, String: `${into} <font color="#56B4E9">狂气[永恒的斗神]</font> ${MODE[1]}`},
	3203: {Zone: UW, String: `${into} <font color="#56B4E9">狂气[不灭的斗神]</font> ${MODE[2]}`},
	// Sky Cruiser Endeavor
	9716: {Zone: SC, String: `${into} <font color="#56B4E9">艾尔凯拉斯号</font> ${MODE[1]}`},
	9916: {Zone: SC, String: `${into} <font color="#56B4E9">艾尔凯拉斯号</font> ${MODE[2]}`},
	3036: {Zone: SC, String: `${into} <font color="#56B4E9">艾尔凯拉斯号</font> <font color="#FF0000">炽热</font>`},
	// Catalepticon - Normal - Hard
	3104: {Zone: CA, String: `${into} <font color="#56B4E9">路克米亚的梦幻</font> ${MODE[1]}`},
	3204: {Zone: CA, String: `${into} <font color="#56B4E9">路克米亚的梦幻</font> ${MODE[2]}`},
	3040: {Zone: CA, String: `${into} <font color="#56B4E9">路克米亚的梦幻</font> ${MODE[5]}`},
	// Killing Grounds - Normal - Hard
	3106: {Zone: GT, String: `${into} <font color="#56B4E9">暴君断头台</font> ${MODE[1]}`},
	3206: {Zone: GT, String: `${into} <font color="#56B4E9">暴君断头台</font> ${MODE[2]}`},
	3042: {Zone: GT, String: `${into} <font color="#56B4E9">暴君断头台</font> ${MODE[5]}`},
	// Fusion Laboratory - Normal - Cursed
	3105: {Zone: FL, String: `${into} <font color="#56B4E9">核心融合所</font> ${MODE[1]}`},
	3205: {Zone: FL, String: `${into} <font color="#56B4E9">核心融合所</font> ${MODE[2]}`}
}
