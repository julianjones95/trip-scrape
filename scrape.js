const puppeteer = require('puppeteer');

async function scrapePage(url){

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	

	for (i=1; i<100; i++){
		try{
			// Title
			const [el1] = await page.$x('//*[@id="deals-random-deals"]/div['+i+']/div/div/div[2]/div/div/div[1]/a[1]')
			const title = await el1.getProperty('textContent')
			const titleTxt = await title.jsonValue();
			
			// Price
			const [el2] = await page.$x('//*[@id="deals-random-deals"]/div['+i+']/div/div/div[3]/div[1]/div/div[3]')
			const price = await el2.getProperty('textContent')
			const priceTxt = await price.jsonValue();
			
			// Date
			const [el3] = await page.$x('//*[@id="deals-random-deals"]/div['+i+']/div/div/div[2]/div/div/span')
			const date = await el3.getProperty('textContent')
			const dateTxt = await date.jsonValue();
			
			
			// Link
			const [el4] = await page.$x('//*[@id="deals-random-deals"]/div['+i+']/div/div/div[2]/div/div/div[1]/a[1]')
			const link = await el4.getProperty('href')
			const linkTxt = await link.jsonValue();
		
			// Link
			const [el5] = await page.$x('//*[@id="deals-random-deals"]/div['+i+']/div/div/div[2]/div/div/div[1]/span');
			const rating = await el5.getProperty('title')
			const ratingTxt = await rating.jsonValue();

			if(priceTxt.length<100 && dateTxt.includes("Jan")){
				priceFilt = priceTxt.substring(0,6)
				console.log({titleTxt, priceFilt, dateTxt, linkTxt, ratingTxt});
			}
		}catch(err){
			console.log('final index: ' + (i-1))
			break;
		}
	}

	browser.close()
}

scrapePage('https://www.redtag.ca/vacation-packages.php?t_id=aud-458200335119:kwd-2170765774&kwd=red%20tag%20vacation&placement=&ad_id=571254238299&kwd_mt=e&g_net=g&ad_pos=&dvc=c&dvm=&clk_phy=9001023&int_loc=&c_id=692585465&adg_id=34734952694&gclid=Cj0KCQjwqc6aBhC4ARIsAN06NmOW8oruQPoPIppZp6HYjFAFSz2LgKwQ4qXeMDjTA1fVPgB7OrKZhAAaAuysEALw_wcB')




