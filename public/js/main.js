
$(document).ready(function () {
    // 輪撥圖
    // var swiper = new Swiper('.swiper-container', {
    //     direction: 'horizontal',
    //     spaceBetween: 0,
    //     speed: 500,
    //     autoplay: {
    //         delay: 3000,
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //     },
    // });

    // input清除按钮
    $(".btn_cancel").click(function () {
        jQuery(this).parent().find(".form-input").val("");
        $(this).hide();
    });

    $(".form-input").keyup(function () {
        var remove = jQuery(this).parent().find(".form-input");
        if (remove.val()) {
            remove.parent().find(".btn_cancel").show();
        } else {
            remove.parent().find(".btn_cancel").hide();
        }
    });

    // input眼睛按鈕
    $(document).on('click', '.btn_eye', function () {
        $(this).toggleClass("eye-show eye-close");
        var input = jQuery(this).parent().find("input");
        if (input.attr("type") == "text")
            input.attr("type", "password");
        else
            input.attr("type", "text");
    });
    // 按鈕Disabled屬性
    $('input').keyup(function () {
        // 登入
        var id = $('#username');
        var pw = $('#password');
        if ((id.val() !== "") && (pw.val() !== "")) {
            $('#login_popup_btn').prop('disabled', false);
        }
        else {
            $('#login_popup_btn').prop('disabled', true);
        }
        // 注册
        var regName = $('#register-name');
        var regPw = $('#register-pw');
        var regPw2 = $('#register-pw2');
        var regTel = $('#register-tel');
        var regEmail = $('#register-email');
        var promotionId = $('#register-promotion');
        if ((regName.val() !== "") && (regPw.val() !== "") && (regPw2.val() !== "") && (regTel.val() !== "") && (regEmail.val() !== "") && (promotionId.val() !== "")) {
            $('#register_popup_btn').prop('disabled', false);
        }
        else {
            $('#register_popup_btn').prop('disabled', true);
        }
        // 充值
        var rechName = $('#recharge-name');
        var rechAmout = $('#recharge-amout');
        if ((rechName.val() !== "") && (rechAmout.val() !== "")) {
            $('#recharge_btn').prop('disabled', false);
        }
        else {
            $('#recharge_btn').prop('disabled', true);
        }
        // 提款
        var withdrAmout = $('#withdrawal_amout');
        var withdrPw = $('#withdrawal_pw');
        if ((withdrAmout.val() !== "") && (withdrPw.val() !== "")) {
            $('#withdrawal_btn').prop('disabled', false);
        }
        else {
            $('#withdrawal_btn').prop('disabled', true);
        }

    });
    // 幫助中心選單
    $('.sub-menu>.title').on('click', function (e) {
        var submenu = $(this).parent();
        if (!submenu.is('.show')) {
            // console.log('2222');
            $('.sub-menu').removeClass('show');
            $('.sub-menu .now').removeClass('now');
            $(submenu).addClass('show');
            $(submenu).children().eq(1).addClass('now');
        }
        e.preventDefault();
    });
    $('.sub-menu>.item').on('click', function (e) {
        if (!$(this).is('.show')) {
            $('.sub-menu .now').removeClass('now');
            $(this).addClass('now');
        }
        e.preventDefault();
    });

    // 側邊導航列
    $(".nav-side .item .clear").click(function () {
        $(".nav-side").addClass("hide");

    });
    // 站內信全部已讀
    $('.message-seen').on('click', function (e) {
        if (!jQuery(e.target).is('.seen')) {
            $('.message-list').addClass("seen");
            $('.message-list').find(".iconfont").removeClass("mail").addClass("mail-open");
        }
    });
    // 账务历史標題
    $('.accordion-title').on('click', function (e) {
        var table = $(this).parent();
        if (table.is('.show')) {
            table.removeClass('show');
        }
        else {
            table.addClass('show');
        }
        $(this).find('.iconfont').toggleClass("dash add");
        e.preventDefault();
    });

    // 細單展開
    $('.accordion-content .active').on('click', function (e) {
        if ($(this).is('.show')) {
            $(this).removeClass('show');
        }
        else {
            $(this).addClass('show');
        }
        e.preventDefault();
    });
    // 市場列表-日期标题選單
    $(document).on('click', '.link1 .trick-title', function (e) {
        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $(this).parents().find('.list-show').removeClass('list-show');
        }
        else {
            $('.link1 .trick-title').removeClass('active');
            $('.link1 .list-show').removeClass('list-show');
            $(this).addClass('active');
            $(this).parents().children().eq(1).addClass('list-show');
        }
        e.preventDefault();
    });
    // 賽事子選單
    $(document).on('click', '.link2 li', function () {
        $('.link2 li').removeClass('active');
        $(this).addClass('active');
    });

    // 個人資料-銀行卡編輯
    $(document).on('click', '.bankcard-edit', function (e) {
        var bankcardedit = jQuery(this).parents().find("#bankcard-edit");
        if (!bankcardedit.is('.show')) {
            bankcardedit.addClass('show');
        }
        else {
            bankcardedit.removeClass('show');
        }
        e.preventDefault();
    });

    // checkbox全選
    $(document).ready(function () {
        $("#checkall").click(function () {
            if ($("#checkall").prop("checked")) {
                $("input[name='Checkbox']").prop("checked", true);
            } else {
                $("input[name='Checkbox']").prop("checked", false);
            }
        })
    });
    // 按鈕更新動畫
    $(".reload-btn").click(function (e) {
        $(this).parent().find('.reload').addClass('spin-animation');

        setTimeout(() => {
            $(this).parent().find('.reload').removeClass('spin-animation');
        }, 500);
        e.preventDefault();
    })

});

//優惠彈窗-背景鎖住scroll
const showModal = () => {
    document.getElementById('promot-detail').style.display = 'block';
    const body = document.body;
    body.style.overflowY = 'hidden';
};

const closeModal = () => {
    const body = document.body;
    body.style.overflowY = 'auto';
    document.getElementById('promot-detail').style.display = 'none';
}











