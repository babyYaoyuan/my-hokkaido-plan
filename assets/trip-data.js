window.TRIP_DATA = {
  title: "北海道 2026/6/13-6/20 轻松逛吃温泉攻略",
  subtitle: "札幌 4 晚 → 洞爷湖温泉 1 晚 → 札幌 2 晚",
  navTitle: "北海道 2026",
  photoGridLabel: "北海道旅行照片",
  checklistTitle: "预订清单",
  hero: {
    eyebrow: "6/13-6/20 · 札幌为主 · 洞爷湖温泉一晚 · 不自驾",
    lede: "这版把攻略拆成每天的独立页面：每一天都有时间线、路线地图和每段交通的 Google 导航入口。",
    metrics: [
      { value: "9 页", text: "含 6/12 浦东前泊" },
      { value: "7 晚", text: "札幌 6 晚，洞爷湖 1 晚" },
      { value: "轻松", text: "默认逛吃，机动日看天气" }
    ],
    primaryAction: { label: "查看每日页面", href: "#days" },
    secondaryAction: { label: "看总路线图", href: "#route-map" }
  },
  photos: [
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Otaru_Hokkaido_Japan.jpg?width=1200",
      label: "小樽 · 运河与堺町通"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/130922%20Lake%20Toya%20Toyako%20Hokkaido%20Japan01s5.jpg?width=900",
      label: "洞爷湖 · 温泉与烟花"
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Odori_Park_Sapporo.JPG?width=900",
      label: "札幌 · 大通与市区"
    }
  ],
  overview: [
    { label: "路线", value: "札幌为基地，一晚湖景温泉", text: "少换酒店，把时间留给吃饭、购物、小店和舒服散步。" },
    { label: "重点", value: "札幌祭、洞爷湖烟花、小樽余市", text: "6/14-6/16 正好遇到札幌祭，6/17 接洞爷湖长期烟花。" },
    { label: "节奏", value: "轻松到适中", text: "日均控制在可调整范围内，每天都留雨天或太累版本。" }
  ],
  overviewRoute: {
    title: "总路线图",
    text: "核心动线是杭州/上海 → 新千岁 → 札幌，穿插小樽余市和洞爷湖温泉，避免大范围奔波。",
    points: [
      { id: "hz-east", name: "杭州东站", lat: 30.291, lng: 120.213, query: "杭州东站" },
      { id: "pvg", name: "上海浦东国际机场", lat: 31.144, lng: 121.808, query: "上海浦东国际机场" },
      { id: "cts", name: "新千岁机场", lat: 42.775, lng: 141.692, query: "New Chitose Airport" },
      { id: "sapporo", name: "札幌", lat: 43.0582, lng: 141.3500, query: "Sapporo Japan" },
      { id: "yoichi", name: "余市", lat: 43.1865, lng: 140.7949, query: "Yoichi Hokkaido" },
      { id: "otaru", name: "小樽", lat: 43.1970, lng: 140.9934, query: "Otaru Hokkaido" },
      { id: "toyako", name: "洞爷湖温泉", lat: 42.5636, lng: 140.8183, query: "Lake Toya Onsen" }
    ],
    legs: [
      { from: "杭州东站", to: "上海浦东国际机场", mode: "transit", time: "出发前泊", duration: "约 2-3 小时", note: "杭州到上海后转去浦东机场附近，降低早航班风险。" },
      { from: "上海浦东国际机场", to: "新千岁机场", mode: "transit", time: "6/13 上午", duration: "航班段", note: "以航司信息为准，抵达后 JR 进札幌。" },
      { from: "新千岁机场", to: "札幌", mode: "transit", time: "抵达后", duration: "约 30-40 分钟", note: "JR Rapid Airport 最省心。" },
      { from: "札幌", to: "余市", mode: "transit", time: "6/15 上午", duration: "约 75-95 分钟", note: "余市车次少于小樽，前一晚再核对。" },
      { from: "余市", to: "小樽", mode: "transit", time: "6/15 中午", duration: "约 30-40 分钟", note: "下午留给堺町通、运河和甜品。" },
      { from: "札幌", to: "洞爷湖温泉", mode: "transit", time: "6/17 中午", duration: "约 2.5-2.75 小时", note: "优先酒店接驳，备选道南巴士。" },
      { from: "洞爷湖温泉", to: "札幌", mode: "transit", time: "6/18", duration: "约 2.5-2.75 小时", note: "回札幌后取寄存行李，做购物和美食补完。" }
    ]
  },
  hotels: [
    { area: "札幌", date: "6/13-6/17、6/18-6/20", text: "优先大通、狸小路、薄野北侧。最好订同一家，确认 6/17-6/18 可寄存大箱子。" },
    { area: "洞爷湖", date: "6/17-6/18", text: "优先湖景、一泊二食、接驳方便。Nonokaze 或 Manseikaku 都适合。" }
  ],
  hotelsNote: "札幌尽量订同一家前后两段，并确认 6/17 退房后能否寄存大箱子到 6/18 再入住。",
  days: [
    {
      id: 0,
      file: "days/day-00.html",
      date: "6/12 周五",
      stay: "浦东机场附近",
      title: "杭州 → 上海浦东",
      shortTitle: "浦东前泊",
      theme: "把早航班风险降到最低",
      intensity: "低强度",
      tags: ["交通", "前泊"],
      summary: "下班后从杭州去上海，直接住浦东机场附近；6/13 尽量 05:30-06:00 到机场。",
      points: [
        { id: "hz-east", name: "杭州东站", lat: 30.291, lng: 120.213, query: "杭州东站" },
        { id: "sh-hongqiao", name: "上海虹桥站", lat: 31.193, lng: 121.318, query: "上海虹桥站" },
        { id: "pvg-hotel", name: "浦东机场附近酒店", lat: 31.153, lng: 121.795, query: "上海浦东机场附近酒店" },
        { id: "pvg", name: "上海浦东国际机场", lat: 31.144, lng: 121.808, query: "上海浦东国际机场" }
      ],
      legs: [
        { from: "杭州东站", to: "上海虹桥站", mode: "transit", time: "下班后", duration: "约 1 小时", note: "优先选择到虹桥的高铁班次，后面直接转去浦东附近。" },
        { from: "上海虹桥站", to: "浦东机场附近酒店", mode: "transit", time: "到上海后", duration: "约 60-90 分钟", note: "太晚就直接打车，目标是早点睡。" },
        { from: "浦东机场附近酒店", to: "上海浦东国际机场", mode: "driving", time: "6/13 05:30 前后", duration: "约 10-20 分钟", note: "国际航班按 05:30-06:00 到机场来安排。" }
      ],
      timeline: [
        { time: "下班后", title: "杭州出发", text: "从杭州东坐高铁去上海，尽量别把酒店订在市区。" },
        { time: "抵达上海", title: "转去浦东", text: "如果到得晚，优先打车或选带机场接驳的酒店。" },
        { time: "睡前", title: "整理随身包", text: "护照、机票、日元现金、交通卡、充电器放在同一个随身包。" }
      ],
      food: ["不要安排复杂晚餐，便利店或酒店附近简单吃。", "买好第二天早餐/水，减少早起变量。"],
      shopping: ["无购物任务，最多补旅行小物。"],
      planB: ["如果高铁晚点，到上海后直接打车去浦东机场附近。", "如果太晚抵达，宁可睡短一点，也不要住市区再早起穿城。"]
    },
    {
      id: 1,
      file: "days/day-01.html",
      date: "6/13 周六",
      stay: "札幌",
      title: "抵达札幌，先进入北海道节奏",
      shortTitle: "抵达札幌",
      theme: "落地、入住、狸小路和第一顿北海道晚餐",
      intensity: "低强度",
      tags: ["抵达", "狸小路", "成吉思汗"],
      summary: "12:50 到新千岁，JR 进札幌，入住后只做大通、狸小路、薄野一带轻松逛吃。",
      points: [
        { id: "pvg", name: "上海浦东国际机场", lat: 31.144, lng: 121.808, query: "上海浦东国际机场" },
        { id: "cts", name: "新千岁机场", lat: 42.775, lng: 141.692, query: "New Chitose Airport" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "odori", name: "大通公园", lat: 43.0606, lng: 141.3477, query: "Odori Park Sapporo" },
        { id: "tanukikoji", name: "狸小路商店街", lat: 43.0578, lng: 141.3513, query: "Tanukikoji Shopping Street Sapporo" },
        { id: "susukino", name: "薄野", lat: 43.0553, lng: 141.3535, query: "Susukino Sapporo" }
      ],
      legs: [
        { from: "上海浦东国际机场", to: "新千岁机场", mode: "transit", time: "08:20-12:50", duration: "航班段", note: "以航司和机场信息为准，Google 链接只用于地点定位。" },
        { from: "新千岁机场", to: "札幌站", mode: "transit", time: "14:00 前后", duration: "约 30-40 分钟", note: "JR Rapid Airport 最省心，机场 B1F 上车。" },
        { from: "札幌站", to: "札幌酒店候选区", mode: "transit", time: "15:00 前后", duration: "约 8-15 分钟", note: "酒店在大通/狸小路/薄野北侧都很方便。" },
        { from: "札幌酒店候选区", to: "大通公园", mode: "walking", time: "16:30", duration: "约 5-12 分钟", note: "只看外观和城市氛围，不把抵达日塞满。" },
        { from: "大通公园", to: "狸小路商店街", mode: "walking", time: "17:00", duration: "约 8 分钟", note: "1-7 丁目随意逛，累了就进地下街。" },
        { from: "狸小路商店街", to: "薄野", mode: "walking", time: "晚餐", duration: "约 5 分钟", note: "成吉思汗、居酒屋、汤咖喱都集中。" }
      ],
      timeline: [
        { time: "05:30-06:00", title: "到浦东机场", text: "按国际航班节奏留余量，不在早上冒险。" },
        { time: "08:20-12:50", title: "浦东飞新千岁", text: "抵达后入境、取行李，去 B1F JR 站。" },
        { time: "14:00-16:00", title: "JR 到札幌并入住", text: "先放行李，别急着跑景点。" },
        { time: "16:30-18:30", title: "大通、狸小路、薄野", text: "用市中心步行线进入北海道节奏。" },
        { time: "19:00", title: "第一顿晚餐", text: "成吉思汗だるま、サッポロビール園，或 Suage/GARAKU 汤咖喱。" }
      ],
      food: ["成吉思汗だるま：仪式感强，可能排队。", "サッポロビール園：更宽敞，适合稳定吃肉和啤酒。", "Suage / GARAKU：想轻松暖胃就吃汤咖喱。"],
      shopping: ["狸小路 1-7 丁目先粗逛，看到喜欢的小物可以先标记。", "Pole Town / Aurora Town 是雨天和体力不足时的替代线。"],
      planB: ["入境或 JR 耽误：直接酒店附近吃，不硬排队。", "下雨：狸小路 + 地下街，不去大通长时间停留。"]
    },
    {
      id: 2,
      file: "days/day-02.html",
      date: "6/14 周日",
      stay: "札幌",
      title: "北海道神宫例祭 + 札幌市区逛吃",
      shortTitle: "札幌祭",
      theme: "祭典摊位、海鲜早午餐、狸小路小店",
      intensity: "中等强度",
      tags: ["札幌祭", "海鲜", "购物"],
      summary: "慢起后去中岛公园或北海道神宫感受札幌祭，下午狸小路与地下街，晚上薄野。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "nakajima", name: "中岛公园", lat: 43.0479, lng: 141.3544, query: "Nakajima Park Sapporo" },
        { id: "shrine", name: "北海道神宫", lat: 43.0557, lng: 141.3077, query: "Hokkaido Jingu Sapporo" },
        { id: "nijo", name: "二条市场", lat: 43.0594, lng: 141.3561, query: "Nijo Market Sapporo" },
        { id: "tanukikoji", name: "狸小路商店街", lat: 43.0578, lng: 141.3513, query: "Tanukikoji Shopping Street Sapporo" },
        { id: "susukino", name: "薄野", lat: 43.0553, lng: 141.3535, query: "Susukino Sapporo" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "中岛公园", mode: "walking", time: "上午", duration: "约 18-25 分钟", note: "中岛公园更偏摊位和热闹氛围。" },
        { from: "中岛公园", to: "北海道神宫", mode: "transit", time: "午前/午后", duration: "约 30-40 分钟", note: "如果想要更有仪式感，再接北海道神宫。" },
        { from: "北海道神宫", to: "二条市场", mode: "transit", time: "午餐", duration: "约 25-35 分钟", note: "海鲜丼、烤蟹、海胆适合早午餐。" },
        { from: "二条市场", to: "狸小路商店街", mode: "walking", time: "下午", duration: "约 7 分钟", note: "古着、杂货、动漫周边和地方食品慢慢看。" },
        { from: "狸小路商店街", to: "薄野", mode: "walking", time: "晚上", duration: "约 5 分钟", note: "薄野居酒屋或成吉思汗补位。" }
      ],
      timeline: [
        { time: "09:30", title: "慢起", text: "不要把祭典日排成赶场日，先判断天气和体力。" },
        { time: "10:30", title: "中岛公园或北海道神宫", text: "中岛公园热闹，北海道神宫更有祭典仪式感。" },
        { time: "12:30", title: "二条市场或汤咖喱", text: "想吃海鲜就二条市场，想稳一点就 Suage4。" },
        { time: "14:30", title: "狸小路 + 地下街", text: "把购物、小店和雨天路线放一起。" },
        { time: "19:00", title: "薄野晚餐", text: "居酒屋、成吉思汗或百货地下食品区。" }
      ],
      food: ["二条市场：海鲜丼/烤蟹/海胆，适合早午餐。", "Suage4：汤咖喱稳定，札幌站附近也顺。", "百货地下食品区：不想排队时买熟食、甜品、酒回酒店。"],
      shopping: ["狸小路 1-7 丁目：古着、杂货、地方食品、小伴手礼。", "Pole Town / Aurora Town：雨天购物线。"],
      planB: ["祭典人太多：改北海道大学、赤砖厅舍外观、札幌站商圈。", "太累：只做中岛公园 + 狸小路，不去神宫。"]
    },
    {
      id: 3,
      file: "days/day-03.html",
      date: "6/15 周一",
      stay: "札幌",
      title: "余市 Nikka + 小樽",
      shortTitle: "余市小樽",
      theme: "威士忌蒸馏所、玻璃音乐盒、运河与甜品",
      intensity: "中等强度",
      tags: ["日归", "小樽", "余市"],
      summary: "上午余市 Nikka，下午小樽堺町通、北一硝子、音乐盒堂、LeTAO 和运河。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "yoichi-sta", name: "余市站", lat: 43.1865, lng: 140.7949, query: "Yoichi Station Hokkaido" },
        { id: "nikka", name: "Nikka 余市蒸馏所", lat: 43.1873, lng: 140.7920, query: "Nikka Whisky Yoichi Distillery" },
        { id: "otaru-sta", name: "小樽站", lat: 43.1970, lng: 140.9934, query: "Otaru Station" },
        { id: "sankaku", name: "三角市场", lat: 43.1987, lng: 140.9947, query: "Sankaku Market Otaru" },
        { id: "canal", name: "小樽运河", lat: 43.1998, lng: 141.0014, query: "Otaru Canal" },
        { id: "sakaimachi", name: "堺町通", lat: 43.1910, lng: 141.0068, query: "Sakaimachi Street Otaru" },
        { id: "music", name: "小樽音乐盒堂", lat: 43.1903, lng: 141.0072, query: "Otaru Music Box Museum" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "札幌站", mode: "transit", time: "08:00", duration: "约 8-15 分钟", note: "预留买票和找站台时间。" },
        { from: "札幌站", to: "余市站", mode: "transit", time: "08:30 前后", duration: "约 75-95 分钟", note: "余市车次少于小樽，前一晚再查一次。" },
        { from: "余市站", to: "Nikka 余市蒸馏所", mode: "walking", time: "10:00", duration: "约 3-5 分钟", note: "无预约可 casual visit，导览需预约且多为日语。" },
        { from: "Nikka 余市蒸馏所", to: "小樽站", mode: "transit", time: "12:00", duration: "约 30-40 分钟", note: "午饭放小樽，选择更多。" },
        { from: "小樽站", to: "三角市场", mode: "walking", time: "12:20", duration: "约 3 分钟", note: "适合寿司/海鲜丼早午餐。" },
        { from: "三角市场", to: "小樽运河", mode: "walking", time: "13:30", duration: "约 10-12 分钟", note: "运河先看一眼，傍晚可再回来。" },
        { from: "小樽运河", to: "堺町通", mode: "walking", time: "14:00", duration: "约 12-15 分钟", note: "玻璃、音乐盒、甜品和小东西密度最高。" },
        { from: "堺町通", to: "小樽音乐盒堂", mode: "walking", time: "16:00", duration: "约 5 分钟", note: "游客多，但适合情侣慢逛。" },
        { from: "小樽音乐盒堂", to: "札幌酒店候选区", mode: "transit", time: "18:00", duration: "约 60-80 分钟", note: "如果小樽晚餐排不上，回札幌薄野补。" }
      ],
      timeline: [
        { time: "08:00-08:30", title: "札幌出发", text: "先去余市，避免下午车次和入场时间紧。" },
        { time: "10:00-11:45", title: "Nikka 余市蒸馏所", text: "博物馆、商店、付费品鉴吧，非深度爱好者不用强求导览。" },
        { time: "12:15-13:30", title: "小樽午餐", text: "三角市场或寿司店，别拖到太晚。" },
        { time: "13:30-17:30", title: "堺町通与运河", text: "北一硝子、音乐盒堂、LeTAO、运河，边走边买。" },
        { time: "18:00-19:00", title: "回札幌或小樽晚餐", text: "看体力和餐厅排队情况。" }
      ],
      food: ["小樽寿司/海鲜丼：三角市场适合早午餐。", "LeTAO：双层芝士蛋糕和伴手礼。", "回札幌后可补薄野居酒屋。"],
      shopping: ["北一硝子：玻璃器皿、小摆件。", "小樽音乐盒堂：小东西密度高。", "堺町通：甜品、食品、杂货。"],
      planB: ["下雨：小樽依然可玩，减少运河停留，增加店内时间。", "不想跑余市：直接小樽一日慢逛，把上午留给三角市场和运河。"]
    },
    {
      id: 4,
      file: "days/day-04.html",
      date: "6/16 周二",
      stay: "札幌",
      title: "札幌祭最终日 + 购物深逛",
      shortTitle: "札幌购物",
      theme: "巡游、札幌站百货、大通、狸小路和 COCONO",
      intensity: "中等强度",
      tags: ["札幌祭", "购物", "美食"],
      summary: "把时间留在市中心，上午/下午看巡游机会，穿插札幌站、大丸、Stellar Place、PARCO、狸小路。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "shrine", name: "北海道神宫", lat: 43.0557, lng: 141.3077, query: "Hokkaido Jingu Sapporo" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "daimaru", name: "大丸札幌", lat: 43.0679, lng: 141.3493, query: "Daimaru Sapporo" },
        { id: "stellar", name: "Stellar Place", lat: 43.0685, lng: 141.3510, query: "Stellar Place Sapporo" },
        { id: "parco", name: "札幌 PARCO", lat: 43.0594, lng: 141.3513, query: "Sapporo PARCO" },
        { id: "tanukikoji", name: "狸小路商店街", lat: 43.0578, lng: 141.3513, query: "Tanukikoji Shopping Street Sapporo" },
        { id: "cocono", name: "COCONO Susukino", lat: 43.0552, lng: 141.3527, query: "COCONO Susukino" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "北海道神宫", mode: "transit", time: "上午", duration: "约 25-35 分钟", note: "巡游从神宫出发，具体观看点当天再按官方和人流判断。" },
        { from: "北海道神宫", to: "札幌站", mode: "transit", time: "中午", duration: "约 25-35 分钟", note: "回到市中心，下午主要靠步行和地下通道。" },
        { from: "札幌站", to: "大丸札幌", mode: "walking", time: "午后", duration: "约 2 分钟", note: "百货地下食品区和服饰都顺路。" },
        { from: "大丸札幌", to: "Stellar Place", mode: "walking", time: "午后", duration: "约 3 分钟", note: "根室花まる也在这一带，适合提前拿号。" },
        { from: "Stellar Place", to: "札幌 PARCO", mode: "walking", time: "下午", duration: "约 15-18 分钟", note: "可走地下步行空间到大通。" },
        { from: "札幌 PARCO", to: "狸小路商店街", mode: "walking", time: "下午", duration: "约 5 分钟", note: "古着、杂货、动漫/模型店顺路查。" },
        { from: "狸小路商店街", to: "COCONO Susukino", mode: "walking", time: "晚上", duration: "约 5 分钟", note: "晚餐前后都能逛。" }
      ],
      timeline: [
        { time: "上午", title: "札幌祭最终日", text: "巡游日不排远郊，把时间留给市中心。" },
        { time: "12:00", title: "札幌站商圈", text: "大丸、Stellar Place、地下食品区。" },
        { time: "14:30", title: "地下步行空间到大通", text: "天气不好也能舒服移动。" },
        { time: "16:00", title: "PARCO、狸小路、COCONO", text: "衣服、小店、杂货和二手店集中扫。" },
        { time: "19:00", title: "预约晚餐", text: "成吉思汗、根室花まる或海鲜居酒屋三选一。" }
      ],
      food: ["成吉思汗だるま：适合预约或错峰。", "根室花まる JR Tower：适合提前拿号。", "海鲜居酒屋：刺身、烤鱼、蟹、当地酒。"],
      shopping: ["札幌站商圈：大丸、Stellar Place、百货地下。", "狸小路/NORBESA/COCONO：小店、二手、动漫模型、杂货。", "きたキッチン：食品伴手礼可以先看，机场最终补。"],
      planB: ["巡游影响交通：全天只走步行可达路线。", "购物兴致高：跳过景点，把札幌站 + 狸小路逛透。"]
    },
    {
      id: 5,
      file: "days/day-05.html",
      date: "6/17 周三",
      stay: "洞爷湖温泉",
      title: "札幌 → 洞爷湖温泉",
      shortTitle: "洞爷湖温泉",
      theme: "只带一晚小包、湖边散步、温泉晚餐、20:45 烟花",
      intensity: "低强度",
      tags: ["温泉", "湖景", "烟花"],
      summary: "札幌退房后寄存大箱子，中午坐酒店接驳或道南巴士去洞爷湖，下午不赶景点。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "toyako-bus", name: "洞爷湖温泉巴士总站", lat: 42.5653, lng: 140.8177, query: "Toyako Onsen Bus Terminal" },
        { id: "manseikaku", name: "Toyako Manseikaku", lat: 42.5658, lng: 140.8225, query: "Toyako Manseikaku Hotel Lakeside Terrace" },
        { id: "nonokaze", name: "The Lake View TOYA Nonokaze", lat: 42.5636, lng: 140.8183, query: "The Lake View Toya Nonokaze Resort" },
        { id: "fireworks", name: "洞爷湖烟花观景湖边", lat: 42.5634, lng: 140.8185, query: "Lake Toya Onsen fireworks viewing" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "札幌站", mode: "transit", time: "11:30-13:30", duration: "约 8-15 分钟", note: "大箱子寄存在札幌酒店，只带一晚温泉小包。" },
        { from: "札幌站", to: "洞爷湖温泉巴士总站", mode: "transit", time: "中午", duration: "约 2.5-2.75 小时", note: "优先酒店接驳；不用接驳则道南巴士 11:30 或 14:10。" },
        { from: "洞爷湖温泉巴士总站", to: "Toyako Manseikaku", mode: "walking", time: "抵达后", duration: "约 5-8 分钟", note: "如果住 Nonokaze，则从巴士总站步行约 5 分钟。" },
        { from: "Toyako Manseikaku", to: "洞爷湖烟花观景湖边", mode: "walking", time: "20:35", duration: "约 3-8 分钟", note: "20:45-21:05 烟花，恶劣天气可能取消。" }
      ],
      timeline: [
        { time: "上午", title: "札幌退房", text: "大箱子寄存在札幌酒店，只带一晚温泉小包。" },
        { time: "中午", title: "去洞爷湖", text: "优先酒店接驳；备选道南巴士直达 Toyako Onsen。" },
        { time: "15:00-16:30", title: "入住与湖边散步", text: "不安排有珠山/昭和新山，今天的重点是休息。" },
        { time: "18:00", title: "酒店晚餐", text: "这一晚建议一泊二食，省掉找餐厅成本。" },
        { time: "20:45-21:05", title: "洞爷湖烟花", text: "住湖侧房最好；否则饭后走到湖边看。" }
      ],
      food: ["酒店一泊二食优先。", "中午在札幌站地下或二条市场简单吃，再上车。"],
      shopping: ["无购物任务。温泉小包：睡衣/换洗/护肤/充电器/护照现金。"],
      planB: ["接驳满座：改道南巴士直达。", "下雨：酒店内泡汤、休息、看湖景，不强行去远处。"]
    },
    {
      id: 6,
      file: "days/day-06.html",
      date: "6/18 周四",
      stay: "札幌",
      title: "洞爷湖 → 札幌，购物和美食补完",
      shortTitle: "回札幌",
      theme: "慢起、回城、取箱、札幌站和百货地下",
      intensity: "低强度",
      tags: ["回城", "购物", "寿司"],
      summary: "上午多泡一会儿，午后回札幌，重新入住后做购物和美食补完。",
      points: [
        { id: "nonokaze", name: "洞爷湖温泉酒店区", lat: 42.5636, lng: 140.8183, query: "Lake Toya Onsen hotel" },
        { id: "toyako-bus", name: "洞爷湖温泉巴士总站", lat: 42.5653, lng: 140.8177, query: "Toyako Onsen Bus Terminal" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "stellar", name: "Stellar Place", lat: 43.0685, lng: 141.3510, query: "Stellar Place Sapporo" },
        { id: "tanukikoji", name: "狸小路商店街", lat: 43.0578, lng: 141.3513, query: "Tanukikoji Shopping Street Sapporo" }
      ],
      legs: [
        { from: "洞爷湖温泉酒店区", to: "洞爷湖温泉巴士总站", mode: "walking", time: "退房后", duration: "约 5-10 分钟", note: "如果坐酒店接驳，按酒店集合点。" },
        { from: "洞爷湖温泉巴士总站", to: "札幌站", mode: "transit", time: "09:50/12:50 或接驳", duration: "约 2.5-2.75 小时", note: "酒店接驳通常 10:00 出发，约 12:30 到札幌。" },
        { from: "札幌站", to: "札幌酒店候选区", mode: "transit", time: "午后", duration: "约 8-15 分钟", note: "取回大箱子，办理再次入住。" },
        { from: "札幌酒店候选区", to: "Stellar Place", mode: "transit", time: "下午", duration: "约 10-15 分钟", note: "百货地下、根室花まる、札幌站购物。" },
        { from: "Stellar Place", to: "狸小路商店街", mode: "walking", time: "傍晚", duration: "约 18-22 分钟", note: "也可以走地下步行空间，不怕雨。" }
      ],
      timeline: [
        { time: "上午", title: "慢起和早餐", text: "退房前泡最后一次温泉。" },
        { time: "10:00-12:30", title: "回札幌", text: "优先酒店接驳，备选道南巴士。" },
        { time: "14:00", title: "重新入住", text: "取回寄存大箱子，整理购物空间。" },
        { time: "15:30", title: "札幌站/地下街", text: "百货地下食品区、Stellar Place、大丸。" },
        { time: "19:00", title: "认真吃一顿北海道", text: "根室花まる、海鲜居酒屋或汤咖喱。" }
      ],
      food: ["根室花まる：道东鱼货、花咲蟹军舰、鱼汤类。", "海鲜居酒屋：刺身、烤鱼、蟹、扇贝、玉米、土豆。", "汤咖喱：Suage / GARAKU / RAMAI，按酒店位置选。"],
      shopping: ["札幌站商圈和百货地下食品区。", "机场不方便托运的伴手礼可以今天先买一部分。"],
      planB: ["回程晚点：晚餐不要预约太早。", "太累：百货地下买熟食 + 甜品回酒店。"]
    },
    {
      id: 7,
      file: "days/day-07.html",
      date: "6/19 周五",
      stay: "札幌",
      title: "机动日：札幌深逛，或积丹/富良野",
      shortTitle: "机动日",
      theme: "默认札幌慢游，美食补完；天气好再加远一点的体验",
      intensity: "低到中等强度",
      tags: ["机动", "海胆", "小店"],
      summary: "默认札幌深逛最符合你们偏好；天气特别好时再考虑积丹海胆/神威岬或富良野美瑛。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "nijo", name: "二条市场", lat: 43.0594, lng: 141.3561, query: "Nijo Market Sapporo" },
        { id: "hokudai", name: "北海道大学", lat: 43.0732, lng: 141.3410, query: "Hokkaido University Sapporo" },
        { id: "maruyama", name: "円山区域", lat: 43.0550, lng: 141.3190, query: "Maruyama Sapporo cafes" },
        { id: "shrine", name: "北海道神宫", lat: 43.0557, lng: 141.3077, query: "Hokkaido Jingu Sapporo" },
        { id: "tanukikoji", name: "狸小路商店街", lat: 43.0578, lng: 141.3513, query: "Tanukikoji Shopping Street Sapporo" },
        { id: "susukino", name: "薄野", lat: 43.0553, lng: 141.3535, query: "Susukino Sapporo" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "二条市场", mode: "walking", time: "上午", duration: "约 8-12 分钟", note: "海鲜早午餐，或改中央卸卖市场场外市场。" },
        { from: "二条市场", to: "北海道大学", mode: "transit", time: "午前", duration: "约 20-30 分钟", note: "校园散步，节奏舒服。" },
        { from: "北海道大学", to: "円山区域", mode: "transit", time: "下午", duration: "约 25-35 分钟", note: "咖啡、小店、神宫周边散步。" },
        { from: "円山区域", to: "北海道神宫", mode: "walking", time: "下午", duration: "约 12-18 分钟", note: "如果 6/14 没去神宫，今天补。" },
        { from: "北海道神宫", to: "狸小路商店街", mode: "transit", time: "傍晚", duration: "约 25-35 分钟", note: "最后一轮衣服/杂货/伴手礼。" },
        { from: "狸小路商店街", to: "薄野", mode: "walking", time: "晚上", duration: "约 5 分钟", note: "最后一顿认真吃。" }
      ],
      timeline: [
        { time: "上午", title: "札幌海鲜早午餐", text: "二条市场或中央卸卖市场场外市场。" },
        { time: "11:30", title: "北海道大学散步", text: "城市里很舒服的一段，不赶景点。" },
        { time: "14:00", title: "円山/神宫周边", text: "咖啡、小店、神宫周边散步。" },
        { time: "16:30", title: "狸小路和札幌站补购物", text: "衣服、杂货、食品伴手礼。" },
        { time: "19:00", title: "最后一顿预约餐", text: "寿司、成吉思汗、海鲜居酒屋三选一。" }
      ],
      food: ["海鲜早午餐：二条市场或场外市场。", "咖啡甜品：円山/大通周边。", "最后一顿：寿司、成吉思汗或海鲜居酒屋。"],
      shopping: ["狸小路、札幌站、大通、COCONO Susukino 做最后补完。", "不想托运的伴手礼先收尾，机场再补货。"],
      planB: ["天气晴且想看海：中央巴士积丹海胆/神威岬一日游。", "想看早夏田园：富良野美瑛观光列车，但别期待薰衣草满开。", "彻底休息：睡到自然醒，只做咖啡、购物和预约晚餐。"],
      alternatives: [
        { title: "备选 A：积丹海胆/神威岬", text: "适合晴天、想看海、愿意牺牲自由度。中央巴士定期观光巴士 8:40 札幌站出发，约 18:36 返回。" },
        { title: "备选 B：富良野美瑛", text: "适合观光列车和早夏田园，不执着薰衣草满开。前一晚按天气决定。" },
        { title: "备选 C：完全休息日", text: "睡到自然醒，札幌站/大通/狸小路补购物，晚上吃预约餐。" }
      ]
    },
    {
      id: 8,
      file: "days/day-08.html",
      date: "6/20 周六",
      stay: "返程",
      title: "札幌 → 新千岁 → 浦东",
      shortTitle: "返程",
      theme: "机场午餐和伴手礼，13:50 飞浦东",
      intensity: "低强度",
      tags: ["机场", "伴手礼", "返程"],
      summary: "10:30 左右从札幌去新千岁，机场午餐和购物，13:50 飞浦东。",
      points: [
        { id: "hotel-odori", name: "札幌酒店候选区", lat: 43.0582, lng: 141.3500, query: "Odori Sapporo hotel" },
        { id: "sapporo-sta", name: "札幌站", lat: 43.0687, lng: 141.3508, query: "Sapporo Station" },
        { id: "cts", name: "新千岁机场", lat: 42.775, lng: 141.692, query: "New Chitose Airport" },
        { id: "pvg", name: "上海浦东国际机场", lat: 31.144, lng: 121.808, query: "上海浦东国际机场" }
      ],
      legs: [
        { from: "札幌酒店候选区", to: "札幌站", mode: "transit", time: "10:00 前", duration: "约 8-15 分钟", note: "09:30 退房，别安排正式景点。" },
        { from: "札幌站", to: "新千岁机场", mode: "transit", time: "10:30 左右", duration: "约 30-40 分钟", note: "机场很好逛，别坐太晚。" },
        { from: "新千岁机场", to: "上海浦东国际机场", mode: "transit", time: "13:50-17:00", duration: "航班段", note: "以航司信息为准，Google 链接只用于地点定位。" }
      ],
      timeline: [
        { time: "09:30", title: "退房", text: "当天别安排正式景点，把余量留给机场。" },
        { time: "10:30", title: "札幌站去新千岁", text: "JR Rapid Airport 最稳。" },
        { time: "11:30-13:00", title: "机场午餐和购物", text: "拉面道场、海鲜/豚丼、白色恋人、六花亭、Royce、薯条三兄弟。" },
        { time: "13:50-17:00", title: "新千岁飞浦东", text: "到浦东后再决定是否当晚回杭州。" }
      ],
      food: ["新千岁机场拉面道场。", "机场海鲜/豚丼类。", "Royce、生巧、北菓楼、六花亭可做最后补货。"],
      shopping: ["白色恋人、六花亭、北菓楼、Royce、生巧、薯条三兄弟、汤咖喱调料包。", "冷藏品注意航班和托运限制。"],
      planB: ["如果当晚回杭州，提前确认浦东到虹桥/杭州的衔接时间。", "不想折腾就浦东或上海住一晚。"]
    }
  ],
  sources: [
    { label: "新千岁机场 JR 交通", url: "https://www.hokkaido-airports.com/en/new-chitose/access/jr/" },
    { label: "札幌官方：北海道神宫例祭", url: "https://www.sapporo.travel/en/event/event-list/hokkaido_shrine_festival/" },
    { label: "札幌官方：狸小路", url: "https://www.sapporo.travel/en/spot/facility/tanukikoji_shopping_arcade/" },
    { label: "札幌官方：地下街", url: "https://www.sapporo.travel/en/spot/facility/sapporo_underground_shopping_malls/" },
    { label: "洞爷湖官方交通", url: "https://www.laketoya.com/en/access/" },
    { label: "洞爷湖长期烟花", url: "https://www.laketoya.com/en/event/fireworks/" },
    { label: "道南巴士：札幌-洞爷湖", url: "https://www.donanbus.co.jp/map/toyako_sapporo/?hp_lang=en" },
    { label: "Nikka 余市蒸馏所", url: "https://www.nikka.com/en/distilleries/yoichi/visit/" },
    { label: "中央巴士：积丹一日游", url: "https://teikan.chuo-bus.co.jp/tw/course/289" }
  ],
  checklist: [
    "订札幌酒店 6/13-6/17。",
    "订洞爷湖酒店 6/17-6/18，优先一泊二食和接驳。",
    "订札幌酒店 6/18-6/20，尽量同一家。",
    "邮件确认札幌酒店可寄存大箱子过夜。",
    "预约洞爷湖酒店接驳或道南巴士。",
    "预约 1-2 顿关键晚餐。",
    "6/18 晚上按天气决定 6/19 机动方案。",
    "返程前一晚整理机场购物清单。"
  ],
  footerNote: "照片来自 Wikimedia Commons。完整文字版见同目录 Markdown 文件。"
};
