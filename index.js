module.exports = function TeraGuide(mod) {
	// 初始化变量数据
	const Ver = mod.majorPatchVersion
	let enabled  = true
	let partyMsg = false
	let debug    = false
	let hooks    = []
	let bossZone = null
	let Custom   = reloadFile('./settings_custom.js')
	// Boss Info
	let b_ID = 0 // BOSS gameId
	let b_HP = 0 // BOSS 血量%
	let h_ID = 0 // huntingZoneId
	let t_ID = 0 // templateId
	let s_ID = 0 // skill.id
	let enraged = false // BOSS愤怒状态
	// DW
	let ballColor = 0 // 打投掷颜色
	// ML
	let bossBuffs = []      // 3 6 9
	let tellingTruth = true // 实话/假话
	// HH
	let Black_Red = 0 // 左黑右红
	// VS
	let checked  = false // 鉴定
	let inverted = false // 正常状态 / 进入灵魂
	let nextMsg  = 0     // 预告下一次[鉴定消息数组]角标
	// RK
	let FirstMsg  = "X"   // 第一顺序技能
	let SecondMsg = "X"   // 第二顺序技能
	let switchMsg = false // 正常顺序 / 反向顺序
	// AA
	let lastTwoUpDate    = 0
	let lastRotationDate = 0
	let rotationDelay    = 0
	// GLS_电气填充
	let powerLevel = 0
	// RM_黑暗/血腥, AQ_红/蓝诅咒, CK_业火/寒气
	let myDeBuff = null
	// SI
	let lastSkill = 0 // 紫/绿武器
	// CK
	let bossQuest = null // 感受愤怒-3026004-3126004 感受恐惧-3026005-3126005
	
	mod.command.add(["guide", "提示"], {
		$none() {
			enabled = !enabled
			enabled ? load() : unload()
			mod.command.message(`副本提示: ${enabled?'启用(ON)':'禁用(OFF)'}`)
		},
		p() {
			partyMsg = !partyMsg
			mod.command.message(`队内提示: ${partyMsg?'启用(ON)':'禁用(OFF)'}`)
		},
		d() {
			debug = !debug
			mod.command.message(`debug: ${debug?'启用(ON)':'禁用(OFF)'}`)
		},
		re() {
			Custom = reloadFile('./settings_custom.js')
			mod.command.message(`reload: ./settings_custom.js`)
		}
	})
	mod.game.me.on('change_zone', (zone, quick) => {
		reset()
		if (enabled && mod.game.me.inDungeon && Custom[zone]) {
			mod.command.message(Custom[zone].String)
			bossZone = Custom[zone].Zone
			load()
		} else {
			bossZone = null
			unload()
		}
	})
	
	function reset() {
		mod.clearAllTimeouts()
		b_ID = 0
		b_HP = 0
		h_ID = 0
		t_ID = 0
		s_ID = 0
		enraged = false
		// DW
		ballColor = 0
		// ML
		bossBuffs    = []
		tellingTruth = true
		// HH
		Black_Red = 0
		// VS_3王
		checked  = false
		inverted = false
		nextMsg  = 0
		// RK_3王
		FirstMsg  = "X"
		SecondMsg = "X"
		switchMsg = false
		// AA
		lastTwoUpDate    = 0
		lastRotationDate = 0
		rotationDelay    = 0
		// GLS
		powerLevel = 0
		// AQ CK
		myDeBuff = null
		// SI
		lastSkill = 0
		// CK
		bossQuest = null
	}
	function reloadFile(fileName) {
		delete require.cache[require.resolve(fileName)]
		return require(fileName)
	}
	function load() {
		if (!hooks.length) {
			hook('S_DUNGEON_EVENT_GAGE',    2, sDungeonEventGage)
			hook('S_BOSS_GAGE_INFO',        3, sBossGageInfo)
			hook('S_NPC_STATUS',            2, sNpcStatus)
			hook('S_CREATURE_ROTATE',       2, sCreatureRotate)
			
			hook('S_SPAWN_NPC',            11, sSpawnNpc)
			hook('S_ACTION_STAGE',          9, sActionStage)
			hook('S_DUNGEON_EVENT_MESSAGE', 2, sDungeonEventMessage)
			hook('S_QUEST_BALLOON',         1, sQuestBalloon)
			
			hook('S_ABNORMALITY_BEGIN', (Ver<107?4 : 5), updateAbnormality)
			hook('S_ABNORMALITY_REFRESH',   2, updateAbnormality)
			hook('S_ABNORMALITY_END',       1, sAbnormalityEnd)
		}
	}
	function hook() {
		hooks.push(mod.hook(...arguments))
	}
	function unload() {
		if (hooks.length) {
			for (let h of hooks) {
				mod.unhook(h)
			}
			hooks = []
			reset()
		}
	}
	function sendMsg(msg, chl) {
		if (partyMsg) {
			mod.send('C_CHAT', 1 , {
				channel: chl ? chl : 25, // 21 = 队长通知, 1 = 组队, 2 = 公会, 25 = 团长通知
				message: `${msg}`
			})
		} else {
			mod.send('S_CHAT', (Ver<108?3 : 4), {
				channel: chl ? chl : 21, // 21 = 队长通知, 1 = 组队, 2 = 公会, 25 = 团长通知
				message: `${msg}`,
				name: 'DG-Guide'
			})
		}
	}
	mod.dispatch.addDefinition('S_DUNGEON_EVENT_GAGE', 2, [
		['name', 'refString'],
		['message', 'refString'],
		
		['unk1', 'int16'],
		['unk2', 'int16'],
		['type', 'int32'],
		['curGage', 'int32'],
		['maxGage', 'int32'],
		['bool', 'byte'],
		['unk4', 'int32'],
		['unk5', 'int32'],
		['name', 'string'],
		['message', 'string']
	])
	function sDungeonEventGage(e) {
		// ML_吹牛
		if (h_ID==470 && t_ID==1000) {
			tellingTruth = !(bossBuffs.includes(e.curGage%10) || bossBuffs.includes(Math.floor(e.curGage/10)))
		}
	}
	function sBossGageInfo(e) {
		b_HP = Number(e.curHp) / Number(e.maxHp)
		if (!b_ID || b_ID!=e.id) b_ID = e.id//, h_ID = e.huntingZoneId, t_ID = e.templateId
		if (e.curHp<=0 || e.curHp==e.maxHp) reset()
	}
	function sNpcStatus(e) {
		if (b_ID != e.gameId) return
		enraged = e.enraged
		if (!enraged && e.enraged) {
			mod.send('S_PLAY_EVENT_SOUND', 2, { // BOSS愤怒提示音效
				id: 9920001,
				type: 1,
				enabled: true
			})
		}
	}
	function sCreatureRotate(e) {
		if (e.gameId==b_ID && lastTwoUpDate) { // AA_3王 后砸
			lastRotationDate = Date.now()
			rotationDelay = e.time
		}
	}
	function sSpawnNpc(e) {
		// DR_6王
		if (e.huntingZoneId==434 && e.templateId==6002) sendMsg(bossZone.TipMsg[8], 25)
		// HH-P3 破坏的神界关口
		// 火墙·右
		if (e.huntingZoneId==950 && [3001, 3005].includes(e.templateId)) sendMsg(bossZone.TipMsg[1], 25)
		// 火墙·左
		if (e.huntingZoneId==950 && [3002, 3006].includes(e.templateId)) sendMsg(bossZone.TipMsg[2], 25)
		// 火墙·下
		if (e.huntingZoneId==950 && [3103, 3105, 3107].includes(e.templateId)) sendMsg(bossZone.TipMsg[3], 25)
		// 火墙·上
		if (e.huntingZoneId==950 && [3104, 3106, 3108].includes(e.templateId)) sendMsg(bossZone.TipMsg[4], 25)
		// 红球
		if (e.huntingZoneId==950 && e.templateId==3016) sendMsg(bossZone.TipMsg[5], 25)
		// 黑球
		if (e.huntingZoneId==950 && e.templateId==3017) sendMsg(bossZone.TipMsg[6], 25)
		// 3007, 3009, 3109, 3111, 属性墙1
		// 3008, 3110, 3010, 3112, 属性墙2
	}
	function sActionStage(e) {
		if (!b_ID || b_ID!=e.gameId || e.stage!=0 || !bossZone || !bossZone[e.templateId]) return
		h_ID = e.skill.huntingZoneId
		t_ID = e.templateId
		s_ID = e.skill.id % 1000 // 愤怒简化 取1000余数运算
		
		var full = e.skill.id
		var bossSkill = null
		if (bossZone[t_ID][full]) {
			bossSkill = bossZone[t_ID][full]
		} else if (bossZone[t_ID][s_ID]) {
			bossSkill = bossZone[t_ID][s_ID]
		} else {
			if (debug) mod.command.message(`未映射: ${h_ID}_${t_ID}-${full}`)
			return
		}
		if (bossSkill.txt) mod.setTimeout(sendMsg, bossSkill.timeout, bossSkill.txt)
		
		
		
		// DW_2王 303360
		if (h_ID==466 && t_ID==46602) {
			if (s_ID==303) sendMsg((bossSkill.tip + bossZone.TipMsg[ballColor]), 25) // 鉴定
			if (s_ID==309 || s_ID==310) ballColor = 4 // 举球内外圈 (开场 / 30%重新进场) 重置记数
		}
		// ML_吹牛 302310
		if (h_ID==470 && t_ID==1000) {
			if ([3213, 3212, 3218].includes(full)) sendMsg(bossSkill.tip[tellingTruth+0], 25)
		}
		// RM_1王 300860
		if ([770, 970].includes(h_ID) && t_ID==1000) {
			if (s_ID==306 || s_ID==307) sendMsg((myDeBuff?bossSkill.tip[(s_ID+myDeBuff+(h_ID==970))%2]:"X"), 25)
		}
		// HH-P3 304020
		if (h_ID==950 && t_ID==3000) {
			if (s_ID==111) sendMsg(bossSkill.tip[Black_Red])
			if (s_ID==134 || s_ID==135) Black_Red = s_ID % 2
		}
		// AA_3王 303440
		if ([720, 920, 3017, 3029].includes(h_ID) && t_ID==3000 && s_ID==104) { // 后砸技能判定
			if (Date.now()-lastRotationDate > 1200) rotationDelay = 0
			if (Date.now()-lastTwoUpDate-rotationDelay < 2900) sendMsg(bossSkill.tip, 25)
			lastTwoUpDate = Date.now()
		}
		// BS_火神 303510 303520
		if ([444, 3037].includes(h_ID) && [1000, 2000].includes(t_ID)) {
			if ([121, 122, 123, 140, 141, 142].includes(s_ID)) { // 半月预测
				mod.setTimeout(() => { sendMsg(bossSkill.tip, 25) }, 60000)
			}
		}
		// AQ_1王 303480
		if ([3023, 3032].includes(h_ID) && t_ID==1000) { // 30231000紅色詛咒氣息 | 30231001藍色詛咒氣息
			if (full==3119 || full==3220) sendMsg((myDeBuff?bossSkill.tip[myDeBuff%2]:"X"), 25)
		}
		// SI_3王 545040
		if (h_ID==3020 && t_ID==2200) {
			if (s_ID==127) sendMsg(bossSkill.tip[(b_HP<0.3)?0:1]) // 后擒 -> 转圈 | ↓30% 前砸
			if (s_ID==121 || s_ID==122) lastSkill = s_ID // 三连击 开始技能
			if (s_ID==123 || s_ID==120) sendMsg(bossZone.TipMsg[(lastSkill+s_ID)%241]) // 三连击 结束技能
		}
		// CK_凯尔 304260
		if ([3026, 3126].includes(h_ID) && t_ID==1000) {
			if ([212, 215, 213, 214].includes(s_ID)) { // 内火-外冰
				mod.setTimeout(() => {
					if (partyMsg) sendMsg(bossSkill.tip[bossQuest%2])
					sendMsg((myDeBuff?bossZone.TipMsg[((s_ID==213 || s_ID==214)+myDeBuff+bossQuest)%2]:"X"), 25)
				}, 300)
			}
			// 换色踩 上级吃虫 -> DEBUFF
			if ([107, 157, 145].includes(s_ID) && b_HP<0.85 && h_ID==3126) {
				sendMsg(bossZone.TipMsg[enraged+2], 25)
			}
		}
		// FA_大剑 545050
		if (h_ID==3027 && t_ID==1000) {
			if ([350, 357].includes(s_ID)) { // 紫/红 鉴定预测
				mod.setTimeout(() => { sendMsg(bossSkill.tip, 25) }, 58000)
			}
		}
		// SC_飞上 1001-302690 / 1000-302700
		if (h_ID==3036 && t_ID==1000) {
			if ([401, 402].includes(s_ID)) sendMsg(bossSkill.tip[enraged+0])
		}
		// GT_暴君 545090
		if ([3106, 3206, 3042].includes(h_ID) && t_ID==1002) {
			if ([106, 107, 109].includes(s_ID)) { // 发射体攻击
				if (partyMsg || mod.game.me.is(e.target)) sendMsg(bossSkill.tip, 25)
			}
		}
	}
	function sDungeonEventMessage(e) {
		var msg_Id = parseInt(e.message.match(/\d+/ig))
		// VS_3王 下一次鉴定提示: 1注-感興趣 2闪-彼此疏遠 3炸-聚在一起
		if ([9781043, 9781044, 9781045, 9981043, 9981044, 9981045, 90340703, 90340704, 90340705].includes(msg_Id)) {
			nextMsg = msg_Id%10 - 2
			if (inverted) nextMsg = nextMsg + 3
			sendMsg((bossZone.TipMsg[0] + bossZone.TipMsg[nextMsg]), 25)
		}
		// RK_3王 上级鉴定: 传送协议 近-9935302 远-9935303 全-9935304
		if ([9935302, 9935303, 9935304, 3034302, 3034303, 3034304].includes(msg_Id)) {
			FirstMsg = bossZone.TipMsg[msg_Id%10 - 1]
			SecondMsg = "X"
			sendMsg((bossZone.TipMsg[0]+FirstMsg+" -> " +SecondMsg), 25)
		}
		if ([9935311, 9935312, 3034311, 3034312].includes(msg_Id)) { // 变更协议 绿-9935311 红-9935312
			switchMsg = !(msg_Id%2)
			sendMsg((bossZone.TipMsg[0]+switchMsg?SecondMsg:FirstMsg+" -> "+switchMsg?FirstMsg:SecondMsg), 25)
		}
		// HH-P3 破坏的神界关口
		if (msg_Id==9950045) sendMsg(`全力破盾!`) // 龍族開始召喚貝勒古斯的儀式。
		// if (msg_Id==9950047) sendMsg(`黑龙 - 团灭!`) // 窟拉德林讓同族的體力恢復。需要進入戰鬥地區。
		// if (msg_Id==9950048) sendMsg(`白龙 - 团灭!`) // 阿加雷斯讓同族的體力恢復。需要進入戰鬥地區。
		// if (msg_Id==9950049) sendMsg(`红龙 - 团灭!`) // 煞布諾克讓同族的體力恢復。需要進入戰鬥地區。
		// if (msg_Id==9950050) sendMsg(`黄龙 - 团灭!`) // 煞雷奧斯讓同族的體力恢復。需要進入戰鬥地區。
		if (msg_Id==9950113) sendMsg(`白龙 - 破盾成功`) // 阻止了阿加雷斯的召喚儀式。
		if (msg_Id==9950114) sendMsg(`黑龙 - 破盾成功`) // 阻止了窟拉德林的召喚儀式。
		if (msg_Id==9950115) sendMsg(`红龙 - 破盾成功`) // 阻止了煞布諾克的召喚儀式。
		if (msg_Id==9950116) sendMsg(`黄龙 - 破盾成功`) // 阻止了煞雷奧斯的召喚儀式。
		if (msg_Id==9950125) sendMsg(`龙族已狂爆!!`)
		// 9950126 30s后狂暴化
		// 9950028, 29, 30, 31, 40貝勒古斯激起血之波浪。
		// 9950032貝勒古斯施展血之波浪。
		if (msg_Id==9950060) sendMsg(bossZone.TipMsg[0], 25) // 貝勒古斯激起屬性的波浪。
		// 9950062後方聚集了不吉利的氣息。
		// DRC_1王 能量填充完畢..
		if (msg_Id==9783103 || msg_Id==9983103 || msg_Id==3018103) sendMsg(bossZone.TipMsg)
	}
	function sQuestBalloon(e) {
		var msg_Id = parseInt(e.message.match(/\d+/ig))
		// DW_2王 轮盘选中球的颜色(王的说话) 顺红-1 顺白-2 顺蓝-3 逆红-5 逆白-6 逆蓝-7
		if ([466050, 466051, 466052, 466054, 466055, 466056].includes(msg_Id)) {
			ballColor = msg_Id%10 + 1
			sendMsg((bossZone.TipMsg[0] + bossZone.TipMsg[ballColor]), 25)
		}
		// FI_1王 谁要被我诅咒看看吗(伯恩斯坦的诅咒)
		if (msg_Id==459015 || msg_Id==759015) sendMsg(bossZone.TipMsg[0], 25)
		// FI_1王 有人撑不住我的诅咒(拉道斯的诅咒)
		if (msg_Id==459021 || msg_Id==759021) sendMsg(bossZone.TipMsg[1], 25)
		// FI_2王 亡灵会暂时醒来
		if (msg_Id==459022 || msg_Id==759022) sendMsg(bossZone.TipMsg[2], 25)
		// VS_3王 鉴定
		if (msg_Id==78142 || msg_Id==98142) { // 死于混乱之中吧(开始鉴定)
			checked = true
			mod.setTimeout(() => { checked = false }, 1000)
			if (b_HP > 0.5) {
				nextMsg = nextMsg+1
				if ((!inverted && nextMsg>3) || ( inverted && nextMsg>6)) nextMsg = nextMsg-3
			} else {
				nextMsg = nextMsg-1
				if ((!inverted && nextMsg<1) || ( inverted && nextMsg<4)) nextMsg = nextMsg+3
			}
			mod.setTimeout(() => {
				sendMsg((bossZone.TipMsg[0] + bossZone.TipMsg[nextMsg]), 25)
			}, 5000)
		}
		if ([78151, 98151, 78152, 98152].includes(msg_Id)) { // 进入灵魂 / 挺能撑的
			inverted = (msg_Id==78151 || msg_Id==98151)
			nextMsg = inverted?(nextMsg+3):(nextMsg-3)
			sendMsg(((inverted?"Into -> ":"Out  -> ") + bossZone.TipMsg[nextMsg]), 25)
		}
		// RK_3王 上级鉴定 执行协议:  1近 2远 3全
		if ([935301, 935302, 935303, 3034301, 3034302, 3034303].includes(msg_Id)) {
			SecondMsg = bossZone.TipMsg[msg_Id%10]
			sendMsg(switchMsg?SecondMsg:FirstMsg+" -> "+switchMsg?FirstMsg:SecondMsg)
			// 下一次鉴定提示
			FirstMsg = SecondMsg
			SecondMsg = "X"
			mod.setTimeout(() => {
				sendMsg((bossZone.TipMsg[0]+switchMsg?SecondMsg:FirstMsg+" -> "+switchMsg?FirstMsg:SecondMsg), 25)
			}, 6500)
		}
		// CK_凯尔 鉴定: 3026004-感受毁灭的愤怒吧-3126004 | 3026005-感受毁灭的恐惧吧-3126005
		if ([3026004, 3126004, 3026005, 3126005].includes(msg_Id)) bossQuest = msg_Id
		// UW_拳师 鉴定: 31031008-深渊-32031008 | 31031009-地狱-32031009
		if ([31031008, 32031008, 31031009, 32031009].includes(msg_Id)) {
			sendMsg(bossZone.TipMsg[msg_Id%2], 25)
		}
		// GT_暴君 注视: 31061001-近-32061001 / 31061002-远-32061002
		if ([31061001, 32061001, 30421001, 31061002, 32061002, 30421002].includes(msg_Id)) {
			sendMsg(bossZone.TipMsg[msg_Id%2], 25)
		}
	}
	function updateAbnormality(e) {
		if (e.target==b_ID) {
			switch(e.id) {
				case 90340105: // DRC_阿卡莎
					sendMsg(bossZone.TipMsg[7], 25)
					break
				case 470046: // ML_吹牛 3-6-9 Buffs
					if (!bossBuffs.includes(3)) bossBuffs.push(3)
					break
				case 470047: // ML_吹牛 3-6-9 Buffs
					if (!bossBuffs.includes(6)) bossBuffs.push(6)
					break
				case 470048: // ML_吹牛 3-6-9 Buffs
					if (!bossBuffs.includes(9)) bossBuffs.push(9)
					break
				case  98200384: // GLS_3王 电气填充(4层爆炸)
				case 302800384:
					if (e.stacks==4 && powerLevel!=4) sendMsg(bossZone.TipMsg, 25)
					powerLevel = e.stacks
					break
				case 90442304: // BS_火神 震怒的暴風(晕技阻止)
				case 30372304:
					sendMsg(bossZone.TipMsg, 25)
					break
			}
		}
		if (mod.game.me.is(e.target)) {
			switch (e.id) {
				case 30209101: // SI_金鳞船 亡靈閃電的襲擊
				case 30209102: // SI_金鳞船 海洋魔女的氣息
					mod.setTimeout(() => { sendMsg(bossZone.TipMsg[2], 25) }, 2000)
					break
				case 97000042: // RM 黑暗利波的憤怒-红
				case 97000057:
				case 97000043: // RM 血腥獵獸的憤怒-蓝
				case 97000058:
				
				case 30231000: // AQ_1王 紅色詛咒氣息
				case 30321000:
				case 30231001: // AQ_1王 藍色詛咒氣息
				case 30321001:
				
				case 30260001: // CK_凯尔 破灭业火
				case 31260001: // CK_凯尔 破灭业火
				case 30260002: // CK_凯尔 破灭寒气
				case 31260002: // CK_凯尔 破灭寒气
					myDeBuff = e.id
					break
			}
		}
	}
	function sAbnormalityEnd(e) {
		if (e.target==b_ID) {
			switch (e.id) {
				case 470046:
					if (bossBuffs.includes(3)) bossBuffs.splice(bossBuffs.indexOf(3), 1)
					break
				case 470047:
					if (bossBuffs.includes(6)) bossBuffs.splice(bossBuffs.indexOf(6), 1)
					break
				case 470048:
					if (bossBuffs.includes(9)) bossBuffs.splice(bossBuffs.indexOf(9), 1)
					break
			}
		}
		if (mod.game.me.is(e.target)) {
			switch (e.id) {
				case 97000042:
				case 97000057:
				case 97000043:
				case 97000058:
				
				case 30231000:
				case 30321000:
				case 30231001:
				case 30321001:
				
				case 30260001:
				case 31260001:
				case 30260002:
				case 31260002:
					myDeBuff = null
					break
			}
		}
	}
}
