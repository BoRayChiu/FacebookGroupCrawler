const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: "new", 
        slowMo: 100,
        args: [
        "-no-sandbox",
        "--disable-extensions"
        ],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36");
    console.log(await GetFacebookUrls(page, "mommytalkNbabies"));
    console.log(await FacebookCrawler(page, "https://m.facebook.com/groups/1260448967306807/posts/6725742017444114/"));
    await page.close();
    await browser.close();
})();

async function GetFacebookUrls(page, group_id) {
    /*
        This will return past 12 hrs posts.
        For example:
            'https://www.facebook.com/groups/1260448967306807/posts/6726696147348701/?__cft__[0]=AZVPL7uhageUtNPWXUowr7EHH65cbYVHxf79pBWjjBuuIn4cU-SZB5DVwBr5x2S0PtVum4fhxAJ8kA2vw76wDWs1xy2868OeAvc-om752S8d6e9EKGP1IySeSUlvFhKA0JumtGp6xGxN1QAq9HVvhyRglA_a7mSEd2NKwTJR5XoFyo8gOdIpakcnpQ5JHHcv2g7Pyrd0x-OGOS4iK5M42Sba&__tn__=%2CO%2CP-R',
            'https://www.facebook.com/groups/1260448967306807/posts/6726696994015283/?__cft__[0]=AZVq4PiYHG6BmRof3IzJV6hXH3TQg_rFPBBdnKTGV-IookUHD_VunsAbEMUSNT5b_k1_-gVLvmvAEwwteOTZa2-xNigUejb5IBoMxZAfzahL8RUxyuF6za7NyfXktbSHeja1kAXQvzGy9CvHQ7YQ46XHy0cT3sjYb9DbBenspnBxQJrB0lGNVD6Km4fXRUakusPTrrxKMQr2KULJRT2NClJb&__tn__=%2CO%2CP-R',
            'https://www.facebook.com/groups/1260448967306807/posts/6726713684013614/?__cft__[0]=AZUEQ71btxfcfx6Y_mpzH9eJ7jHyiq1SlFSTxGhPOadav1i6NEC4w6MZ4eN4VJ9l2O1dzXdxxZsgkTOgEgP0Xcbh6umu4PLE9e7Q8k2_jC4SYS-FbsIxQV5AaBtnxaC_d3163wC7W0BJjw3Kt0W0Ql3iPmC38BJ5E8m18bGamT5-BlcsmlyXgZqreRhNwKB7I2RVyy84rSs05l9WoZFd649J&__tn__=%2CO%2CP-R',
            'https://www.facebook.com/groups/1260448967306807/posts/6726883780663271/?__cft__[0]=AZW58L4RFqz1IYInnADcc3pqzxEvld3VcsUtqY8G5ckfWNMn3UGSi6YHT2f5ct4YfJaM4xWxqbrkGpE4H9xqgw8uADpGN0gKFGEvVAASy9hqe5vm87hQuz3oAD1wa-H3A5bm0VOap_JvYjpKyFowbS9beLOGHc6yapzt8kr8SIGR3RJvdyEYK8_HfduBXCa8SYctQdYAfMjkPQahniCqOI30&__tn__=%2CO%2CP-R',
            'https://www.facebook.com/groups/1260448967306807/posts/6725742017444114/?__cft__[0]=AZWdSePYTFbId4-nyYZ_8Hcv3J0FU6sQCtlD9517aIaBOr5UJnMLS7xKv1Zq4ZHGV23Jf0xj_Cci_7NCJ0Qf2OkAWNE38_WhLKD6ROKNS5NYa0v6zZjsdNjZtryJaW3pcz8hdDb_KhgHxU4sq1HsoskGUj_EawM1rvB9y3VDSDmWEx4fgTAwHsBbOTO0RgIbjTZNrkkDcAHtbq3b18k7ywP5&__tn__=%2CO%2CP-R'
    */ 
    const article_class = "div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z";
    const time_class = ".x4k7w5x.x1h91t0o.x1h9r5lt.x1jfb8zj.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j > .x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm";
    const url_class = "span > .x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm";
    const group_url = "https://www.facebook.com/groups/" + group_id + "?sorting_setting=CHRONOLOGICAL";
    await page.goto(group_url);
    let loadMore = true;
    while(loadMore) {
        await Scroll(page, 1);
        await page.waitForSelector(article_class);
        const time_array = await GetTextContents(page, time_class);
        for(let time of time_array) {
            if((time.slice(-1) == "h" && parseInt(time.substring(0, time.length - 1)) >= 12) || time.slice(-1) == "d") {
                loadMore = false;
                break;
            }
        }
    }
    const urls = await GetHrefs(page, url_class);
    return urls;
}

async function FacebookCrawler(page, url) {
    const article_class = ".story_body_container";
    const time_class = "._52jc._5qc4._78cz._24u0._36xo > a";
    const content_class = "._5rgt._5nk5";
    const comments_class = "._59e9._1-ut._2a_g._34oh";
    const previous_comments_class = "._5msp.img.sp_iccWU6qVgMf.sx_4aad80";
    const comment_class = "._2b04";
    const comment_author_class = "._2b06 > div._2b05";
    const comment_contents_class = "._2b06 > div:nth-child(2)";
    const has_subcomments_class = "._4ayk";
    const subcomments_class = "._2b1k";
    await page.goto(url);
    await Scroll(page, 5);
    const result = {}
    await page.waitForSelector(article_class);
    // Time
    time = await GetTextContent(page, time_class);
    result["Time"] = await FormatDatetime(time);
    // Contents
    result["Contents"] = await GetTextContent(page, content_class);
    // Comments
    await page.waitForSelector(comments_class);
    let loadMore = true;
    let click_time = 0;
    while (loadMore) {
        try{
            await page.waitForSelector(previous_comments_class);
        }
        finally {
            const previous_comments_element = await page.$(previous_comments_class);
            if(previous_comments_element !== null && click_time < 100) {
                await page.evaluate(ele => ele.click(), previous_comments_element);
                click_time += 1;
            }
            else {
                loadMore = false;
            }
        }
    }
    const comment_elements = await page.$$(comment_class);
    const comments = await Promise.all(comment_elements.map(async (comment_element) => {
        return get_comments(comment_element);
    }));
    async function get_comments(comment_element) {
        const comment = {};
        // Comment Author
        author = await GetTextContent(comment_element, comment_author_class);
        // if comment contents is an image.
        if(author == "") {
            return comment;
        }
        comment["Author"] = author;
        // Comment Contents
        comment["Contents"] = await GetTextContent(comment_element, comment_contents_class);
        // SubComments
        const subcomments = [];
        const has_subcomments_element = await comment_element.$(has_subcomments_class);
        if(has_subcomments_element != null) {
            await page.evaluate(ele => ele.click(), has_subcomments_element);
            await comment_element.waitForSelector(subcomments_class);
            const subcomments_element = await comment_element.$(subcomments_class);
            const subcomment_author = await GetTextContents(subcomments_element, comment_author_class);
            const subcomment_contents = await GetTextContents(subcomments_element, comment_contents_class);
            for(let i = 0; i < subcomment_author.length; i++) {
                subcomments.push({Author: subcomment_author[i], Contents: subcomment_contents[i]});
            }
        }
        comment["SubComments"] = subcomments;
        return comment;
    }
    // remove comment just has image.
    for(let comment of comments) {
        if(comment == {}) {
            const index = comments.indexOf(comment);
            comments.splice(index, 1);
        }
    }
    console.log(comments[2]["SubComments"]);
    result["Comments"] = comments;
    return result;
}

async function GetTextContent(context, class_selector) {
    try {
        await context.waitForSelector(class_selector);
        const result = await context.$eval(class_selector, el => el.textContent);
        return result;
    }
    catch {
        return "";
    }
}

async function GetHrefs(context, class_selector) {
    try {
        await context.waitForSelector(class_selector);
        const result = await context.$$eval(class_selector,
            (eles) => {
                return eles.map(ele => ele.href);
            });
        return result;
    }
    catch {
        return "";
    }

}

async function GetTextContents(context, class_selector) {
    try {
        await context.waitForSelector(class_selector);
        const result = await context.$$eval(class_selector, 
            (eles) => {
                return eles.map(ele => ele.textContent);
            });
        return result;
    }
    catch {
        return [];
    }
}

async function FormatDatetime(time) {
    let date = new Date();
    if(time.slice(-2) == "hr") {
        date.setHours(date.getHours() - parseInt(time.substring(0, time.length - 3)));
    }
    else if(time.slice(-3) == "hrs") {
        date.setHours(date.getHours() - parseInt(time.substring(0, time.length - 4)));
    }
    else if(time.slice(-4) == "mins"){
        date.setMinutes(date.getMinutes() - parseInt(time.substring(0, time.length - 5)));
    }
    else {
        date.setMinutes(date.getMinutes() - parseInt(time.substring(0, time.length - 4)));
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function Scroll(page, scroll_time) {
    let viewportHeight = page.viewport().height;
    for(let i = 0; i < scroll_time; i++) {
        await page.evaluate((_viewportHeight) => {
            window.scrollBy(0, _viewportHeight);
        }, viewportHeight);
        await page.waitForTimeout(2000);
    }
}