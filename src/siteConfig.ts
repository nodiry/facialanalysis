const site : string = "http://localhost:3003/";
export const siteConfig = {
    links : {
        signup:site + "auth/signup",
        signin:site+"auth/signin",
        twoauth:site+"auth/twoauth",
        profile:site+"auth/user",
        dashboard:site+"dashboard",
    },
    uz: {
        last_modified:"Ohirgi o'zgarish vaqti: ",
        created:"Qo'shilish vaqti: ",
        editprofile:"Profilni o'zgartirish",
        editprofilemes:"Profil tafsilotlarini o'zgartirish uchun ushbu sahifadan foydalaning.",
        delconfirm:"Tasdiqlash",
        deleteprofile:"Profil hisobini o'chirish",
        areusure:"Haqiqatan ham o'chirmoqchimisiz?",
        deletemes1:"Bu jarayon ortga qaytarilmaydi. Iltimos, ",
        deletemes2:" so'zini tasdiqlash uchun kiriting. Sizning profilingiz, bog‘langan veb-saytlaringiz va ularning barcha metrik ma'lumotlari o‘chiriladi.",
        integrationmes:"Veb-saytingiz uchun integratsiya kodini oling va uni sahifangizga qo‘shing.",
        integration:"Integratsiya kodi",
        addwebsite:"Veb-sayt qo'shish",
        addwebsitemes:"Yangi veb-sayt qo‘shish va uning trafikasini kuzatish.",
        pleaseinput:"Iltimos, ushbu ",
        deleteconfirm:" so‘zini tasdiqlash uchun kiriting.",
        deletewebsitemes:"Veb-sayt va uning barcha tafsilotlarini butunlay o‘chirish.",
        deletewebsite:"Veb-saytni o‘chirish",
        refreshmetric:"Eng yangi statistikalarni olish uchun yangilash.",
        updatewebsite:"Metrikalarni yangilash",
        editwebsite:"Veb-saytni tahrirlash",
        websiteurl:"Veb-sayt URL manzili",
        description:"Tavsif",
        geodistro:"Geografik taqsimot",
        geodistromes:"Ushbu grafik veb-sayt trafikining mamlakatlar bo‘yicha taqsimotini ko‘rsatadi.",
        avgsession:"O'rtacha sessiya davomiyligi",
        avgsessionmes:"Bu grafik foydalanuvchilarning sahifada qancha vaqt o'tkazganini ko‘rsatadi.",
        pages:"Sahifalar",
        pagesmes:"Har bir sahifaning berilgan vaqt oralig‘idagi trafik ko‘rsatkichi.",
        refermes:"Berilgan vaqt oralig‘ida trafik kelib chiqqan manbalar.",
        referrers:"Yo‘naltiruvchilar",
        devdismes:"Foydalanuvchi qurilmalarining taqsimoti.",
        devdistribution:"Qurilma taqsimoti",
        avgbounceratemes:"Foydalanuvchilarning sahifalar o‘rtasida sakrash darajasini ko‘rsatuvchi grafik.",
        avgbouncerate:"O‘rtacha sakrash darajasi",
        visitchartmes:"Berilgan vaqt davomida tashriflar va noyob tashrifchilar grafigi.",
        visitchart:"Tashriflar statistikasi",
        avgloadtime:"O‘rtacha yuklanish vaqti",
        avgloadtimedesc:"Ushbu grafik sahifaning o‘rtacha yuklanish vaqtini ko‘rsatadi: ",
        infomes:"Ushbu veb-sayt haqida qo‘shimcha ma'lumotlar.",
        day:"24 soat",
        week:"Hafta",
        month:"Oy",
        all:"Barcha vaqtlar",
        profile:'Profil',
        nometricmes:"Oxirgi 24 soatda ma'lumotlar mavjud emas.",
        visits:"Tashriflar",
        uniquevisits:"Noyob tashrifchilar",
        bouncerate:"Sakrash darajasi",
        avgses:"O‘rt. sessiya",
        toppages:"Eng ko‘p tashrif buyurilgan sahifalar",
        topreferrers:"Eng ko‘p yo‘naltiruvchi manbalar",
        mobile:"Mobil",
        tablet:"Planshet",
        desktop:"Kompyuter",
        totalvisits:"Jami tashriflar",
        nowebmes:"Hali hech qanday veb-sayt qo‘shilmagan.",
        webcreate:"Veb-sayt qo‘shish",
        language:"Til",
        metrics:"Ko‘rsatkichlar",
        website:"Veb-sayt",
        menu:"Menyu",
        system:"Tizim",
        theme:"Ko‘rinish",
        dark:"Qorong‘u",
        light:'Yorug‘',
        twoauthm:"Tasdiqlash uchun elektron pochtangizga bir martalik kod yuborildi. Ushbu joyga kodni kiriting.",
        forgot:"Parolni unutdingizmi?",
        username:"Foydalanuvchi nomi",
        firstname:"Ism",
        lastname:"Familiya",
        email:"Elektron pochta",
        password:"Parol",
        role:"Vazifa",
        owner:"Egası",
        manager:"Menejer",
        dev:"Dasturchi",
        designer:"Dizayner",
        analyst:"Tahlilchi",
        project:"Loyiha",
        work:"Ish",
        team:"Jamoa",
        teammember:"Jamoa a'zosi",
        issue:"Muammo",
        signup:"Ro‘yxatdan o‘tish",
        signin:"Tizimga kirish",
        signout:"Tizimdan chiqish",
        twoauth:"Ikki bosqichli tekshiruv",
        hide:"Parolni yashirish",
        show:"Parolni ko‘rsatish",
        dashboard:"Asosiy panel",
        process:"Jarayon",
        docs:"Hujjatlar",
        about:"Haqida",
        error:"Xatolik",
        NotAuthorized:"Sizda kerakli ruxsat yo‘q!",
        Forbidden:"Bu ma'lumot sizga taqiqlangan!",
        NotFound:"Bu ma'lumot tizimda mavjud emas.",
        CrashServer:"Ichki tizim xatosi yuz berdi.",
        loading:"Ma'lumotlar yuklanmoqda, iltimos kuting...",
    },
    en: {
        last_modified: "Last modified at: ",
        created: "Created at: ",
        editprofile: "Edit Profile",
        editprofilemes: "Modify your profile details such as name, email, and password.",
        delconfirm: "Confirm",
        deleteprofile: "Delete Profile",
        areusure: "Are you sure you want to delete your profile?",
        deletemes1: "This action is irreversible. Please type ",
        deletemes2: "to confirm. Your account, websites, and all associated analytics data will be permanently deleted.",
        integrationmes: "Copy and paste this embedding code into your website to start tracking analytics.",
        integration: "Integration Code",
        addwebsite: "Add Website",
        addwebsitemes: "Register a new website to track traffic and view analytics.",
        pleaseinput: "Please input ",
        deleteconfirm: " to confirm the deletion of this website and its associated data.",
        deletewebsitemes: "Permanently remove this website and all its recorded analytics data.",
        deletewebsite: "Delete Website",
        refreshmetric: "Retrieve the latest analytics data for this website.",
        updatewebsite: "Update website metrics",
        editwebsite: "Edit Website",
        websiteurl: "Website URL",
        description: "Description",
        geodistro: "Geographical Distribution",
        geodistromes: "This graph displays traffic distribution by country.",
        avgsession: "Average Session Duration (s)",
        avgsessionmes: "Represents the average time users spend on a page.",
        pages: "Pages",
        pagesmes: "Displays traffic per page over a selected time period.",
        refermes: "Traffic sources for the selected time period.",
        referrers: "Referrers",
        devdismes: "Breakdown of visitors by device type.",
        devdistribution: "Device Distribution",
        avgbounceratemes: "Shows the percentage of users who leave the site after viewing only one page.",
        avgbouncerate: "Average Bounce Rate",
        visitchartmes: "Shows the number of visits and unique visitors over time.",
        visitchart: "Visitor Trends",
        avgloadtime: "Average Load Time",
        avgloadtimedesc: "Represents the average time it takes for the website to load.",
        infomes: "General information about this website.",
        day: "Last 24 hours",
        week: "Week",
        month: "Month",
        all: "All time",
        profile: "Profile",
        nometricmes: "No analytics data available for the past 24 hours.",
        visits: "Visits",
        uniquevisits: "Unique Visitors",
        bouncerate: "Bounce Rate",
        avgses: "Avg. Session",
        toppages: "Top Pages",
        topreferrers: "Top Referrers",
        mobile: "Mobile",
        tablet: "Tablet",
        desktop: "Desktop",
        totalvisits: "Total Visits",
        nowebmes: "No websites have been added yet.",
        webcreate: "Add Website",
        language: "Language",
        metrics: "View Analytics",
        website: "Website",
        menu: "Menu",
        system: "System",
        theme: "Theme",
        dark: "Dark",
        light: "Light",
        twoauthm: "A one-time code has been sent to your email. Please enter it here to verify your identity.",
        forgot: "Forgot your password?",
        username: "Username",
        firstname: "First Name",
        lastname: "Last Name",
        email: "Email",
        password: "Password",
        role: "Role",
        owner: "Owner",
        manager: "Manager",
        dev: "Developer",
        designer: "Designer",
        analyst: "Analyst",
        project: "Projects",
        work: "Work",
        team: "Team",
        teammember: "Team Member",
        issue: "Issue",
        signup: "Sign Up",
        signin: "Sign In",
        signout: "Sign Out",
        twoauth: "Two-Factor Authentication",
        hide: "Hide Password",
        show: "Show Password",
        dashboard: "Dashboard",
        process: "Process",
        docs: "Documentation",
        about: "About",
        error: "Error",
        NotAuthorized: "You are not authorized to access this page.",
        Forbidden: "You do not have permission to view this content.",
        NotFound: "Sorry, the requested page could not be found.",
        CrashServer: "An internal server error occurred. Please try again later.",
        loading: "Loading data... Please wait.",
    },
    kr: {
        last_modified: "마지막 수정: ",
        created: "생성일: ",
        editprofile: "프로필 수정",
        editprofilemes: "이름, 이메일, 비밀번호 등의 프로필 정보를 수정하세요.",
        delconfirm: "확인",
        deleteprofile: "프로필 삭제",
        areusure: "정말로 프로필을 삭제하시겠습니까?",
        deletemes1: "이 작업은 되돌릴 수 없습니다. 계속하려면 ",
        deletemes2: "을(를) 입력하세요. 계정, 웹사이트 및 모든 분석 데이터가 영구적으로 삭제됩니다.",
        integrationmes: "이 코드를 웹사이트에 추가하여 방문자 데이터를 추적하세요.",
        integration: "연동 코드",
        addwebsite: "웹사이트 추가",
        addwebsitemes: "새 웹사이트를 등록하고 트래픽을 추적하세요.",
        pleaseinput: "입력하세요: ",
        deleteconfirm: " 을(를) 입력하여 웹사이트 및 해당 데이터를 삭제합니다.",
        deletewebsitemes: "이 웹사이트 및 모든 기록된 분석 데이터를 영구적으로 삭제합니다.",
        deletewebsite: "웹사이트 삭제",
        refreshmetric: "이 웹사이트의 최신 분석 데이터를 가져옵니다.",
        updatewebsite: "웹사이트 데이터 업데이트",
        editwebsite: "웹사이트 편집",
        websiteurl: "웹사이트 URL",
        description: "설명",
        geodistro: "지역별 트래픽 분포",
        geodistromes: "이 그래프는 국가별 트래픽 분포를 보여줍니다.",
        avgsession: "평균 세션 지속 시간 (초)",
        avgsessionmes: "사용자가 페이지에서 머문 평균 시간을 나타냅니다.",
        pages: "페이지",
        pagesmes: "선택한 기간 동안의 페이지별 트래픽을 보여줍니다.",
        refermes: "선택한 기간 동안의 트래픽 유입 경로입니다.",
        referrers: "유입 경로",
        devdismes: "기기 유형별 방문자 비율입니다.",
        devdistribution: "기기별 분포",
        avgbounceratemes: "한 페이지만 보고 떠난 사용자의 비율을 나타냅니다.",
        avgbouncerate: "평균 이탈률",
        visitchartmes: "시간에 따른 방문자 및 순 방문자 수를 보여줍니다.",
        visitchart: "방문자 추이",
        avgloadtime: "평균 로딩 시간",
        avgloadtimedesc: "웹사이트가 로드되는 평균 시간을 나타냅니다.",
        infomes: "이 웹사이트의 기본 정보입니다.",
        day: "최근 24시간",
        week: "일주일",
        month: "한 달",
        all: "전체 기간",
        profile: "프로필",
        nometricmes: "최근 24시간 동안 분석 데이터가 없습니다.",
        visits: "방문",
        uniquevisits: "순 방문자",
        bouncerate: "이탈률",
        avgses: "평균 세션",
        toppages: "인기 페이지",
        topreferrers: "주요 유입 경로",
        mobile: "모바일",
        tablet: "태블릿",
        desktop: "데스크탑",
        totalvisits: "총 방문 수",
        nowebmes: "아직 등록된 웹사이트가 없습니다.",
        webcreate: "웹사이트 추가",
        language: "언어",
        metrics: "분석 보기",
        website: "웹사이트",
        menu: "메뉴",
        system: "시스템",
        theme: "테마",
        dark: "다크",
        light: "라이트",
        twoauthm: "이메일로 일회용 코드가 전송되었습니다. 본인 확인을 위해 입력해주세요.",
        forgot: "비밀번호를 잊으셨나요?",
        username: "사용자명",
        firstname: "이름",
        lastname: "성",
        email: "이메일",
        password: "비밀번호",
        role: "역할",
        owner: "소유자",
        manager: "매니저",
        dev: "개발자",
        designer: "디자이너",
        analyst: "분석가",
        project: "프로젝트",
        work: "작업",
        team: "팀",
        teammember: "팀원",
        issue: "이슈",
        signup: "회원가입",
        signin: "로그인",
        signout: "로그아웃",
        twoauth: "이중 인증",
        hide: "비밀번호 숨기기",
        show: "비밀번호 표시",
        dashboard: "대시보드",
        process: "프로세스",
        docs: "문서",
        about: "소개",
        error: "오류",
        NotAuthorized: "이 페이지에 접근할 권한이 없습니다.",
        Forbidden: "이 콘텐츠를 볼 수 있는 권한이 없습니다.",
        NotFound: "요청한 페이지를 찾을 수 없습니다.",
        CrashServer: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.",
        loading: "데이터를 불러오는 중... 잠시만 기다려 주세요.",
    },
}