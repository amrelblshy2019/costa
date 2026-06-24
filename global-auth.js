// كود التحقق من البيانات والحفاظ على الجلسة
document.addEventListener("DOMContentLoaded", function () {
    // جلب بيانات المستخدم الحالي
    const currentUser = JSON.parse(localStorage.getItem("tourism_user"));
    
    // إذا لم يكن العميل مسجلاً، يتم تحويله لصفحة تسجيل الدخول تلقائياً
    if (!currentUser && !window.location.href.includes("login.html")) {
        alert("برجاء تسجيل الدخول أولاً للوصول إلى هذه الصفحة.");
        window.location.href = "login.html";
    }

    // تهيئة السلة والمفضلة لو مش موجودين
    if (!localStorage.getItem("tourism_cart")) localStorage.setItem("tourism_cart", JSON.stringify([]));
    if (!localStorage.getItem("tourism_favs")) localStorage.setItem("tourism_favs", JSON.stringify([]));

    // تشغيل الهيدر الذكي لو موجود في الصفحة
    if (document.getElementById("global-header-data")) {
        renderGlobalHeader(currentUser);
    }
});

// دالة تحديث وعرض بيانات العميل في الهيدر الثابت
function renderGlobalHeader(user) {
    const headerArea = document.getElementById("global-header-data");
    if (user) {
        headerArea.innerHTML = `
            <div class="user-badge">
                <i class="fas fa-user-circle"></i>
                <div class="user-info-text">
                    <span class="user-name">${user.name}</span>
                    <span class="user-email">${user.email}</span>
                </div>
                <button onclick="logoutClient()" class="logout-mini-btn" title="تسجيل الخروج">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    }
}

function logoutClient() {
    localStorage.removeItem("tourism_user");
    alert("تم تسجيل الخروج بنجاح.");
    window.location.href = "login.html";
}