const puppeteer = require('puppeteer');
videos = []

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless:false, 
    defaultViewport: null,
    args: ["--window-size=1920,1080"]
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  await page.setRequestInterception(true);
  page.on('request', (request) => request.continue())
  page.on('response', response => {
    try {
      if (response.url().indexOf("api/recommend/item_list/item_list") > 0){   
        response.json().then((data) => {
            data.itemList.forEach( async (el,c) => {
              videos.push({id:el.id, textExtra: el.textExtra})
          }) 
        })
        console.log("Received Video Data. Seen " + videos.length + " so far")         
      }
    } catch(e) {
      console.log(e);

    }
  });
  await page.goto('https://tiktok.com/foryou');

  let logindialog = await page.$('div[data-e2e="modal-close-inner-button"]')
  await logindialog.click(page, 'div[data-e2e="modal-close-inner-button"]');
  const sigistate = await page.$eval('#SIGI_STATE', el => el.innerHTML);
  initinfo = JSON.parse(sigistate)
  
  Object.keys(initinfo.ItemModule).forEach( async (el,c) => {
    videos.push({id:el.id, textExtra: el.textExtra})
  }) 
  while (true) {
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
  }
}
run();


