const { parseHashTags } = require('./hashtags');

const texts = [
  '화장 지우기 아까운 날 있잖아여\n카메라 어플 한 몫 안 비밀\n\n#canada#toronto#homesweethome#selfie#daily#ootd#토론토#집#화장지우기#아까워#사진#남기자#셀피#데일리#일상#soda#sodacamera#소통',
  'ᴊɪᴍᴍʏ\'s ᴄᴏғғᴇᴇ 💛',
  '구름도 마음도 하튜하튜❣️\n.\n#보라리여행_토론토#토론토일상#❤️',
  'ᴊɪᴍᴍʏ\'s ᴄᴏғғᴇᴇ✔️',
  'ᴊɪᴍᴍʏ\'s ᴄᴏғғᴇᴇ ☕️',
  '#gambling 인생역전 실패~!',
  'I bought my skateboard\n 열심히 놀아봅시다 🤪',
  '#hellosummer ! 🏖 We don’t set alarms for the morning anymore. The days are longer and the sun feels extra bright. ☀️\nYogi🐶 and Boxie🐶 are ready for #summerfun with the new #puppiaharness and matching leashes. 🥰🥰\n.\n.\n.\n.\n.\n.\n#cavalierkingcharlesspaniel #kingcharlescavalier #kingcharlesspaniel #fashiondog #dogfashion #prettieyiji #prettieyijipetboutique #torontopetstore #yorkvilletoronto #torontodogs #dogsoftoronto #weeklyfluff #mydogrunsthe6ix #dogslife #dogsofig #petsofinstagram #gooddoggo #cutedogs #handsomedog #brotherdog #dogbrothers #토론토 #멍스타그램 #댕댕이그램 #카발리에킹찰스스파니엘 #dogsoftheday #doglovers',
  'Let\'s walk! .\n.\n#토론토 #잔디 #공원 #걷자 #toronto #photography #summer #park #pedicure #daily #일상 #날씨좋다 #기분좋아 #사진',
  '토론토 써머리셔스 7월 5일부터 시작!\r\n링크 클릭하셔서 분위기 좋은 장소를 알아보고 예약해보세요!',
  '7월 토론토에서 열리는 페스티벌 리스트\r\n놓치지말고 즐겨보세요!',
  'Cold brew for 2, please ☕️ • 콜드 브루 2잔 😌',
  'SOS유학센터 7월 액티비티 달력 공개!\n토론토의 여름을 알차게 즐기고자 7월에는\n조금 더 다양하고 재미있는 액티비티로 준비해봤습니다😎\n자세한 사항은 SOS유학센터 네이버카페 참고 부탁드려요:)',
  '🤦‍♂️\n요새 살크업하느라 등치가 마이 크짓당 \n아이폰으루 함 찌그바야게따',
  '-\n오늘 하루,\n예수님이 주시는 참된 평안 안에 깊이 머무는 시간되길 기도합니다\n\n#ywamtoronto\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n#말씀 #묵상 #하나님 #예수님 #성령님 #믿음 #예수전도단 #기도 #말씀배경 #말씀묵상 #말씀카드 #큐티 #크리스찬 #예배 #해외dts #토론토 #화요모임 #토론토화요모임 #귀납적성경연구 #예수제자학교 #해외ywam #토론토예수전도단 #성경 #독수리성경연구학교 #성경연구 #예배 #어학연수 #영어학교',
  'Bridal bouquet for this weekend 💕\n.\n.\n#whiteflowers #wedding #weddingflowers #dahlia \n#bouquet #lovely #flowers #bridebouquet #torontowedding #toronto #bridetobe2020 #weddingflowers #torontoflorist  #cappuccinoroses  #torontoflowers #torontoweddingplanner #floraldesign \n#토론토 #토론토웨딩 #토론토웨딩플로리스트 #토론토플로리스트  #多伦多婚礼 #花  #结婚 #结婚花 #多伦多 #weddingdecor #wedding #weddingdetails  #torontochinesewedding',
  '🍓Strawberry Bingsu !\n⠀⠀⠀\n📍 THORNHILL - 5 Glen Cameron Road\n📍 STEELES - 100 Steele’s Ave W, Unit 14A\n⠀⠀⠀\n#딸기빙수 #cups #bingsu #bingsoo #toronto #the6ix #foodporn #foody #shavedice #timetoeat #lovetoeat #blogto #foodislove #yelp #foodpicture #foodexplorer #foodtime #토론토 #커피빙수 #토론토맛집 #好吃',
  '샤샤의 하루\n요즘 엄빠랑 같이 출근해서 \n먹고 자고 퇴근하는 샤샤😍',
  'Summer\n.\n#blue #toronto #daily #sky #summer #june #cityview #daily #downtown #city #view #토론토 #시티뷰 #여름 #일상 #퇴근길 #하늘 #多伦多 #空 #トロント#帰りに #2019',
  '잘 먹겠습니다 🙇🏻‍♀️',
  '대륙은 참 넓고 나는 먼지 같은 존재 ㅎㅎ',
  '버킷리스트 중 하나: 꽃 배우기💐',
  '#Italian 죠아 😍 #lunch#밀가루폭탄.\n.\n.\n.\n.\n#점심#파스타#날좋은날#패티오#patio#toronto#토론토#foodphotography#음식스타그램',
  '날이 더워질수록 기분이 좋아진다!!\n.\n.\n.\nPhoto cred. @hyunhak__ .\n.\n#캐나다 #토론토 #데이트 #여름 #덥다 #럽스타그램 #데일리 #간호사 #사진잘찍는 #남친 #행복 #toronto #summer #hothothot #sweating #love #nurse',
  '𝐂𝐡𝐥𝐨𝐞 𝐍𝐚𝐢𝐥 𝐃𝐞𝐬𝐢𝐠𝐧 #파우더 + #체인스와\n#부러진손톱연장 해서 맞추고 슥샥슥샥\n_\n▪️Color : Rose Oil @cream_gel_official\n▪️파우더 : 광채파우더 @pochit_nail\n▪️Swarovski : 4600,4470 Rose Water Opal\n_\n#광채파우더 #미러네일#파우더네일#토론토#토론토네일#젤네일#네일아트#젤네일아트#스와로브스키#스와네일#스톤네일#인스타네일#네일스타그램#화려한네일#심플한네일#glitternails#swarovski#swarovskinails#stonenails#toronto#torontonails#gelnails#nailart#gelnailart#notd#ootd #ネイルアート',
  '유진쓰와 쑈핑 여름이다ㅏ☀️\n.\n.\n#캐나다 #토론토 #canada #toronto #eaton \n#일상 #daily #good #夏 #暑い #좋아요',
  '놀이터투어\n놀이터전문가과정 수료중\n#육아스타그램 #아빠스타그램 #딸스타그램 #34개월 #토론토 #토론토대디 #일상소통 #육아소통 #부부스타그램 #가족스타그램 #육대디 #놀이터그램 #왕복80분머문시간50분몽미',
  'Finally i got them!!😍 으아아아 드디어 왔다 우여곡절 끝에 받은 챔스 우승 기념 유니폼 ㅠㅠ 하 너무나 좋구요 우린 이제 빅이어가 6개다 이거에요🏆🏆🏆🏆🏆🏆\n.\n.\n#lfc #liverpool #liverpoolfc #uniform #championsleague #jersey #husband #couple #red #ynwa #daily #toronto #canada #sports #hobby #soccer #리버풀 #챔스 #유니폼 #일상 #커플티 #택배 #토론토 #축구 #취미',
  '#식단기록 #눈바디 #눈바디샷 \n오늘도 점심은 간단하게 커피+차전피코코넛빵 + 바나나 1개\n\n오늘은 스티프 데드리프트와 코어운동 위주로 연습. 근육의 느낌을 최대한 잡는 것을 목표로 두고 무거운 중량보다는 가벼운 걸로 횟수 늘려서 연습함. 가끔 보면 중량 무겁게 드는것보다 가벼운거 들때 자극이 더 잘 느껴지는 듯하다.\n\n아직 애기 근육이지만 조금씩 원하는 라인이 빼꼼 고개를 내미는 것 같다. 허리가 긴편라 상부 엉덩이를 열심히 만들려도 하는데 근육 만들기 정말 어려운듯 ㅠ 그래도 1년동안 운동해서 이정도가 어디냐하며 내년를 기대해본다. 이대로 계속하다보면 언젠가는 마음에 드는 몸매가 나오겠지! \n#다이어터 #자기관리 #운동하는여자 #운동일상 #여름준비 #토론토 #일상 #일상스타그램',
  'Look how her lashes look natural. For different types of eyes we advice different lash sets. Therefore it\'s very important to correctly choose set. As you can see, her lashes and eyes don\'t look heavy. If you want to get the same result this note is for you. N set, 3D, C curl, 11-13. The designer is Tasha. .\n☎️inquires and more info-647-637-7777\n🙋‍♀️You can book online👉www.elysiabeauty.com(North york)🌏www.elysialash.com(Downtown)\n.\n.\n#toronto #eyelashextension #lashtraining #torontoeyelashes #torontobeauty #토론토속눈썹  #nomascara #torontolife #eyelashtraining  #토론토 #torontolashes #northyorklashes #downtownlashes #volumelashes #lashboss #girlboss #memory #withfriends #gtaeyelashes #gtaeyelashextensions #gtalashes #lashoftheday #torontolashtraining #elysiabeautybar_toronto',
  '매일 매일 물놀이 💦 #feat보일랑말랑무지개🌈 . .\n\n#일상 #데일리 #뉴욕 #뉴욕일상 #토론토 #가족 #셀스타그램 #먹스타그램',
  '...\n도서관나들이📚\n책보다 벤딩머신앞을 좋아하는 4살🐷\n.\n.\n.\n.\n.\n.\n#Aiden#1478daysoldtoday#instakids#instadaily#instamom#love#son#mom#toronto#toddler#bigboy#mommylife##wednesday#양띠맘#청양띠#일상#해외#토론토#애스타그램#맘스타그램#육아스타그램#도치맘#아들맘#워킹맘#아주미#육아소통#일상스타그램#사랑해아들',
  '안녕하세요 욕 대학 한인 학생 여러분! \n모두가 행복하고 뜻깊은 방학을 보내는 동안 여러분께 더욱유익한 혜택과 소중한 추억을 만들어갈 기회를 제공할 수 있도록 체계적인 준비를 하고 있던 York University Korean Students Association 이 다시 한번 여러분께 인사드립니다! \n우선, 벌써 많은 분이 새 학기에 찾아뵐 19-20 욕 대학 한인 학생회에 많은 관심을 가져 주시고 여러 질문 해주시는 점에 대해 정말 감사하다는 말씀 전하고 싶습니다. \n잠깐 근데, \n여러분이 주셨던 대부분의 질문 내용이, “이번 한인회는 누가 이끌어 가나요?” 혹은 “저도 임원 할 수 있나요?” 이던데\n\n그래서 준비했습니다. <2019-2020 욕대 한인회 임원 공고>\n\n장담컨대, 대학교 생활하면서 저희 한인회 임원 활동만큼 많은 사람과 친해지고 잊지 못할 추억 만들 기회 찾아보기 어디 없다는 거 보장합니다! \n임원 지원이 망설여 지신다고요? \n똑같은 고민 갖고 있던 작년 임원분들,  올해 또 하고 싶다고 난리라 조금 당황스럽습니다. \n후회하지 않으실 기회입니다, 주저 없이 지원해 주세요! \n지원 자격: 욕 대학 재학생 혹은 입학생 (성별, 나이, 학년, 전공, 성적 무관)\n\n지원 방법:\n https://docs.google.com/forms/d/19-wnXoDRYXWTiy63CwRXaR_oi802Y0NSreH-Ypoa-n4/edit (욕 대학 한인 학생회 공식 SNS에 링크 걸어 두겠습니다) *욕 대학 한인 학생회 공식 SNS,\nInsta: @yuksayorku ,\nFacebook: https://www.facebook.com/profile.php?id=100010758010583 \n모집 기간: \n2019년 6월 27일 - 2019년 8월 25일 \n궁금하신 사항들이 있다면 언제든지 위 SNS 주소로 디엠 혹은 메세지 주시면 정말 감사하겠습니다!\n.\n#yuksa #yorku #toronto #canada #토론토 #욕대 #캐나다 #유학생',
  '.\nRBC은행150주년 커스텀케익.\n.\nKorean traditional dessert n food\nLuNa\'s Kitchen👩🏻‍🍳 DIMIVANGM\n캐나다 왕립은행 RBC ROYAL BANK CANADA\n-\n#RBC #royalbankofcanada #customcake #branch #shepperdandrean #BI #CI #토론토 #전통디저트 #떡한과 #디미방엠 #toronto #koreanfood #koreafoodtrading #korean #traditional #food #premium #dessert #food #tteok #drank #styiling #catering #cookingclass #gift #sweet #toronto #ontario #canada #dimivang #dimivangm',
  '⠀⠀⠀﻿⁠\nThanks for your order 😘⠀﻿⁠\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀﻿⁠\n🌸Bean paste flower cake⁣⠀﻿⁠\n앙금플라워 케이크⁣⠀⠀﻿⁠\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀﻿⁠\n🔗Order & Book a class available ⠀﻿⁠\nwww.jellybeancake.com⠀﻿⁠\n⠀⠀⠀﻿⁠\n🖱June Classes are available⠀⠀⁣⠀﻿⁠\n- ⠀⠀﻿⁠\n🌸Bean paste flower Rice Cake Class⠀﻿⁠\n🍰Strawberry short Cake Class⠀﻿⁠\n🎂Gateau Madame Cake Class⠀﻿⁠\n🥛Fresh Cream Roll Cake Class⠀﻿⁠\n🍫Real Chocolate Cake Class⠀﻿⁠\n🌹Butter Flower Cake Class⠀﻿⁠\n☕Tiramisu Cake Class⠀﻿⁠\n⠀⠀⠀⠀﻿⁠\n📍Location:3336A Yonge st Toronto (Yonge&Lawrence) ⠀⠀⠀⠀﻿⁠\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀﻿⁠\n*원하시는 클래스가 있을경우, DM 혹은 메일로 연락 주시면 오픈 가능 합니다. 💕 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀﻿⁠\n* please note that we always can customize baking class upon your request. please let us know ; size of class, type of cake or dessert, and your availability. Thank you for your support and love. 💕⠀⠀⠀﻿⁠\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀﻿⁠\n#cakes #desserts #torontocake #jellybeancake #젤리빈케이크 #baking #원데이클래스 #토론토 #toronto #cakedesign #cakes #토론토맛집 #토론토케이크 #토론토일상 #토론토디저트 #토론토앙금플라워 #앙금플라워 #flowercake #koreandessert #토론토앙금 #토론토플라워 #torontolife #instadaily #torontolife #캐나다맘',
  '🔵Booking& other inquiries🔵\nKakao : cks841121\nWechat : goldlinebrow\nwww.goldlinebrow.com\n.\n✖ By appointment only\n\n#토론토 #토론토속눈썹펌 #토론토반영구화장#torontobrows #토론토네일 #토론토눈썹문신#eyebrowfeathering #토론토문신 #torontolashlift #토론토속눈썹 #toronto#토론토반영구수강 #토론토반영구 #토론토눈썹연장 #토론토남자눈썹 #토론토아이라인#토론토눈썹반영구 #토론토눈썹 #토론토일상 #yyz #토론토입술#半永久化妝 #眉毛 #眼线 #嘴唇 #发际线 #토론토헤어라인 #토론토메이크업 #토론토두피문신 #토론토속눈썹',
  'It\'s iced americano weather again yeeee~ 😍😍😍 #icedamericano #coffee #coffeeshop #café #toronto #summer #토론토 #일상 #코피 #카페스타 #오늘 #아이스아메리카노',
  '2019년 6월 26일 - Express Entry 추첨현황\n초대장 발급: 3,350건\n추첨 일시: 2019년 6월 26일 12시 30분 54초 UTC\nCRS 추첨 최저점수: 462점\nTie-Breaking Rule (동점자 룰): 2019년 5월 11일 이전에 프로파일 업로드 한 신청인들에게만 해당\n.\n.\n.\nExpress Entry 자격이 되시는지 궁금하신가요? 지금 바로 한우드 캐나다 이민 컨설팅으로 문의해보세요! 무료로 자격 판정을 도와드립니다.\n.\n.\n#hanwoodcanada#캐나다이민#캐나다유학#한우드캐나다#ICCRC#캐나다정부공인법무사#벤쿠버#캘거리#토론토#강남#캐나다로키여행#ielts#영주권#캐나다취업이민프로그램#설명회#세미나',
  '토이스토리 덕후와 함께보는 영화🎬\n.\n#toystory #토이스토리 #토이스토리4 #캐나다 #토론토 #영화 #휴일 #커플 #집사 #영화관 #데이트 #럽스타그램 #😻',
  '#yorku #토론토 #toronto #canada #캐나다',
  '원더랜드 워터파크가 드디어 열렸어요 ㅠㅠ\n오전에 촬영하고 오후는 아이들과 실컷놀고...\n근데 언제 집에 갈꺼야??ㅎㅎㅎ\n“\n“\n“\n“\n#원더랜드 #토론토 #토론토여행 #물놀이 #딸바보아빠 #일상스타그램 #토론토일상 #웨딩촬영 #웨딩사진작가 #아이폰 #물놀이는아이폰 #방수 #육아소통',
  'How’s Everyone’s Wednesday So Far?\n•\n•\n•\n•\n.\n#lazywednesday#lazyyorkie#yorkielove#yorkie#love#dog#doggram#doggie#toronto#dogs#canada#sun#daily#follow#instadog#토론토#멍스타그램#일상#여름#주말#공원#개스타그램#멍멍이#맞팔#팔로우',
  '🌹',
  'My brother pillow. My favourite! 💤💤 —\n#danteewirefoxterrier 🎩 #oreoaussiedoodle 🐾\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n⠀⠀⠀\n@wiremoments @wirefoxterrierlovers @pawnatic @dogs_media @dogsofinstagram\n#danteefoxterrier #wirefoxterrier #wirefoxterrierlovers #wiremoments #puppy #puppies #puppygram #instapuppy #dog #dogs #Aussiedoodle #toronto #the6ix #canada #토론토 #캐나다 #토론토일상',
  '4th edition 9MV t-shirt\n.\n#티셔츠 #follow #tshirt #체형교정 #9movement #운동 #재활 #토론토 #스튜디오 #필라테스 #기능성운동 #운동하는여자 #운동하는남자 #bayview #toronto #PT #pilates #Lifting #personaltraining #한인운동 #golftr #ninemovement #번호4169019990 #주소20ReanDr #무료검사 #torontolife #healthylifestyle #workout #functionalfitness',
  '크림소스파스타',
  '빨간국물떡볶이!!',
  'Cottage weekend weather 🤸‍♂️\n⠀\nJuly bookings by DM please! ⠀\n#toronto #torontosnap #torontophotographer #torontophotography #토론토 #토론토스냅 #photoshoot #beauty #portrait #girl #snap #photography #model #profile #portraitphotography #개인작업 #사진 #인물사진 #모델촬영 #스냅 #감성 #감성촬영 #감성사진 #모델 #스냅촬영 #개인화보 #컨셉촬영 #프로필 #촬영문의',
  '힐링...💚\n.\n.\n#힐링 #토론토 #캐나다 #무스코카 #여행 #자연 #행복 #데일리 #일상 #리조트 #스트레스해소',
  '모두가 행복한 바비큐 파티:) 🥩🦐🥓\n.\n.\n.\n.\n.\n.\n.\n.\n\n#summer #backyard #patio #deck #여름 #bbq #바비큐 #파티 #party #bbqparty #barbeque #corona #beer #맥주 #데일리그램 #toronto #토론토 #맛팔 #맥주파티 #새우 #새우소금구이 #삼겹살 #돼지고기 #shrimp #porkbelly #grill',
  'Hello from the middle of Canada! 🇨🇦.⁣\n⁣.⁣\n⁣We post new content daily so follow us on IG and subscribe to our YouTube channel!⁣\n⁣.⁣\n⁣#maltipom #maltese #maltesepuppy #pomeranian #youtubevideos #youtuber #youtubers #dogyoutuber #dogsofinstagram #canadadogs #dogscanada #dogsincanada #bestdog #dogsofinstaworld #dogsandpals #dogscorner #worldofcutepets #petsofinstagram #animaladdicts #weeklyfluff  #ruffpost #awwfeed #petsdelight #thehappynow #dogsofcanada #캐나다 #유투브 #bestdogintheworld #mydogmakesmehappy #토론토',
  '#sakebarkushi #yakitori #izakaya #toronto #sushi #Japanese #foodporn #sake#torontos #foodie#torontofoodie #맛스타그램 #토론토 #canada  #トロント  #居酒屋 #instagramers #instagood #tiff #torontofood #Christmas #christmas market #먹스타그램#焼鳥 #foodto #torontorestaurants #blogto #토론토맛집 #blogto \n#酒 #tastetoronto #dineto',
  '이때가 진짜 작년 피크 였는데...\n얼른 저것보다 훨씬 커지고 좋아지고 싶다\nLast year Best Physique so far..\nWanna get bigger and better than that\n.\n.\n.\n#토론토 #followforfollowback #follow4followback #fitnessmotivation #goodlifefitness #f4f#운동하는남자#운동하는여자#소통#소통스타그램#호구#병신#등#등신#헬스타그램#운동스타그램#pt#ifbb#fitness#workoutmotivation #workout#backworkout #toronto#canada#캐나다#벤쿠버#슴둘#흔남#운동#헬창',
  '➖Hello, Follow @tattoopeopletoronto➖\n————————————————————\n📞:1-647-850-5977\n✉️:tattoopeople521@gmail.com\n🖥:www.tattoopeople.ca\n➖Tattoo work by @colecurtis__ ➖\n—————————————————————\n#tattoopeopletoronto\n————————————————————\n#tattoo#tattoos#tattooink#tattooartist#torontotattoo#tattooink#art#TAOT#tttism#tattoopia#txttooing#tattooartist#design#illustration#torontoinknews#타투#타투도안#드로잉#일러스트#타투일러스트#토론토#타투피플#纹身#刺青\n#americantranditional#traditionaltattoo#vintagetattoo#tradtattoo#oldschool',
  '➖Hello, Follow @tattoopeopletoronto➖\n————————————————————\n📞:1-647-850-5977\n✉️:tattoopeople521@gmail.com\n🖥:www.tattoopeople.ca\n➖Tattoo work by @colecurtis__ ➖\n—————————————————————\n#tattoopeopletoronto\n————————————————————\n#tattoo#tattoos#tattooink#tattooartist#torontotattoo#tattooink#art#TAOT#tttism#tattoopia#txttooing#tattooartist#design#illustration#torontoinknews#타투#타투도안#드로잉#일러스트#타투일러스트#토론토#타투피플#纹身#刺青\n#americantranditional#traditionaltattoo#vintagetattoo#tradtattoo#oldschool',
  '➖Hello, Follow @tattoopeopletoronto➖\n————————————————————\n📞:1-647-850-5977\n✉️:tattoopeople521@gmail.com\n🖥:www.tattoopeople.ca\n➖Tattoo work by @colecurtis__ ➖\n—————————————————————\n#tattoopeopletoronto\n————————————————————\n#tattoo#tattoos#tattooink#tattooartist#torontotattoo#tattooink#art#TAOT#tttism#tattoopia#txttooing#tattooartist#design#illustration#torontoinknews#타투#타투도안#드로잉#일러스트#타투일러스트#토론토#타투피플#纹身#刺青\n#americantranditional#traditionaltattoo#vintagetattoo#tradtattoo#oldschool',
  '⠀⠀\n캐나다 🇨🇦\n⠀⠀⠀⠀⠀\n하나하나 클리어하는 기분\n이제 New york으로~\n⠀⠀⠀\n#세계일주 #배낭여행 #킬리 #보헤미안 #지구한바퀴 #여행에미치다 #캐나다 #토론토 #canada #toronto #travelphotography #travelholic #worldtravel #trip #backpacker',
  'flowers or whatevuh',
  '⠀⠀\n캐나다 🇨🇦\n⠀⠀⠀⠀⠀\n캐네디언 예비부부 집에서 일주일 동안 먹고 자고 오랜만에 맘 편히 민폐 끼치고 갑니다\n둘 다 일주일동안 휴가까지 내서 가이드 해주고 아주 칭찬함\n⠀⠀⠀\n#레이첼고마웡 #박석인엿 #수염 #접사 #세계일주 #배낭여행 #지구한바퀴 #여행에미치다 #캐나다 #토론토 #canada #toronto #travelphotography #travelholic #worldtravel #trip #backpacker',
  '_\nToday’s dessert 🍵🍩\nHoney lemon tea + Canadian maple\n#난 #스트레스받으면 #도넛을먹더라\n#오늘도 #무의식중에 #도넛을달라함\n#팀홀튼 #캐나다 #토론토 #힘내자\n#stressful #timhorton #dessert\n#canadianmaple #honeylemontea\n#toronto #canada #chinups',
  '이번 여행은 패키지라 특별히 맛난게 없어서 사진이 엄청 없네 \n얻ㄱㄴ지도 모르것음\n작년 가족여행 \n인천 → 뉴욕 → 필라델피아 → 워싱턴DC → 해리스버그 → 나이아가라 → 토론토 → 몬트리올 → 천섬(오타와) → 퀘벡 → 콩코드 → 보스톤 → 뉴욕 → 인천\n#작년가을 #미국 #캐나다 #가족 #여행 #여행스타그램 #뉴욕 #퀘백 #토론토 #traveling #travelphotography #travel #familytrip #instatravel #travelingram #추억스타그램 #trip #여행그램 #tripstagram #tripping #triplovers #여행일기 #trippics #추억팔이 #휴가스타그램 #여행기록 #여행추억 #휴가그램 #여행중 #trippin',
  '#디톡스 에 좋은 5가지 성분 알고가세요🧐\n\n우엉, 금잔화, 호로파, 그린커피빈, 녹차\n⠀⠀⠀\n체중감량+디톡스+소화력\n\n지금 현재 체중관리 프로그램중인 분들의 규칙적이고 건강한 생활을 도와줄거에요 🏃🏻‍♀️🏃🏻‍♂️👍🏻\n⠀⠀⠀\n#영양제추천 #영양제직구 #영양제그램 #캐나다직구 #캐나다영양제 #캐나다 #해외직구 #토론토 #건강 #건강식품 #건강기능식품 #다이어트 #디톡스다이어트 #디톡스허브 #허벌슬림',
  '무지커 등장~\n나이아가라 hornblower 안개속 숙녀호\n작년 가족여행 \n인천 → 뉴욕 → 필라델피아 → 워싱턴DC → 해리스버그 → 나이아가라 → 토론토 → 몬트리올 → 천섬(오타와) → 퀘벡 → 콩코드 → 보스톤 → 뉴욕 → 인천\n#작년가을 #미국 #캐나다 #가족 #여행 #여행스타그램 #뉴욕 #퀘백 #토론토 #traveling #travelphotography #travel #familytrip #instatravel #travelingram #추억스타그램 #trip #여행그램 #tripstagram #tripping #triplovers #여행일기 #trippics #추억팔이 #휴가스타그램 #여행기록 #여행추억 #휴가그램 #여행중 #trippin',
  'GO Slim! GO Healthy! Forskolin\n⠀⠀⠀\n하루 한 캡슐! 편리한 체지방 관리\n근육량은 증가, 체지방의 감소\n\n건강한 체지방 감소를 위한 자연소재 성분 #포스콜린 하세요 😉💜\n⠀⠀⠀\n#영양제추천 #영양제직구 #영양제그램 #캐나다직구 #캐나다영양제 #캐나다 #해외직구 #토론토 #건강 #건강식품 #건강기능식품 #다이어트 #디톡스다이어트 #디톡스허브 #허벌슬림 #토론토 #토론토일상 #토론토맛집 #캐나다일상',
  '우드버리 아울렛\n작년 가족여행 \n인천 → 뉴욕 → 필라델피아 → 워싱턴DC → 해리스버그 → 나이아가라 → 토론토 → 몬트리올 → 천섬(오타와) → 퀘벡 → 콩코드 → 보스톤 → 뉴욕 → 인천\n#작년가을 #미국 #캐나다 #가족 #여행 #여행스타그램 #뉴욕 #퀘백 #토론토 #traveling #travelphotography #travel #familytrip #instatravel #travelingram #추억스타그램 #trip #여행그램 #tripstagram #tripping #triplovers #여행일기 #trippics #추억팔이 #휴가스타그램 #여행기록 #여행추억 #휴가그램 #여행중 #trippin',
  'Today is test day ~~ 😜',
  '@instagram why cant i use tags\n.\n.\n\n#훈스타그램  #ootd #셀피 #좋아요 #대학생 #99년생 #훈남 #훈녀 #좋아요반사 #셀카 #오늘의훈녀 #토론토 #상하이 #서울 #인친 #多伦多 #韩国 #汉城 #東京 #운동 #데일리룩 #소통 #혼혈 #찍스타그램 #옷스타그램',
  'tried cat eyeliner for a change🐱meow\n.\n.\n\n#훈스타그램  #ootd #셀피 #좋아요 #대학생 #99년생 #훈남 #훈녀 #좋아요반사 #셀카 #오늘의훈녀 #토론토 #상하이 #서울 #인친 #多伦多 #韩国 #汉城 #東京 #운동 #데일리룩 #소통 #혼혈 #찍스타그램 #옷스타그램',
  'Roses bloom for you 🖤✨\n.\n.\n\n#훈스타그램  #ootd #셀피 #좋아요 #대학생 #99년생 #훈남 #훈녀 #좋아요반사 #셀카 #오늘의훈녀 #토론토 #상하이 #서울 #인친 #多伦多 #韩国 #汉城 #東京 #운동 #데일리룩 #소통 #혼혈 #찍스타그램 #옷스타그램',
  'glimmering darling ✨🖤\n.\n.\n\n#훈스타그램  #ootd #셀피 #좋아요 #대학생 #99년생 #훈남 #훈녀 #좋아요반사 #셀카 #오늘의훈녀 #토론토 #상하이 #서울 #인친 #多伦多 #韩国 #汉城 #東京 #운동 #데일리룩 #소통 #혼혈 #찍스타그램 #옷스타그램',
  'first post 🖤🕸\n.\n.\n\n#훈스타그램  #ootd #셀피 #좋아요 #대학생 #99년생 #훈남 #훈녀 #좋아요반사 #셀카 #오늘의훈녀 #토론토 #상하이 #서울 #인친 #多伦多 #韩国 #汉城 #東京 #운동 #데일리룩 #소통 #혼혈 #찍스타그램 #옷스타그램'
];

describe('HASHTAG PARER TESTING', () => {
  it('parses hashtags from a given string', () => {
    texts.forEach((text) => {
      const hashtags = parseHashTags(text);

      hashtags.forEach((tags) => {
        expect(/^#/.test(tags)).toBeTruthy();
        expect(/^\S*$/.test(tags)).toBeTruthy();
      });
    });
  });
});
