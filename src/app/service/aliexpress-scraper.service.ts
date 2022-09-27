import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

@Injectable()
export class AliexpressScraperService {
  private readonly logger = new Logger(AliexpressScraperService.name);

  async scan() {
    const url =
      'https://www.aliexpress.com/category/100003109/women-clothing.html';
    const pages = await this.fetchProducsPages(url);
    this.logger.log(`Found ${pages.length} products.`);
  }

  fetchProducsPages(pageUrl: string): Promise<any[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      const productsURL = [];

      //Fetch page data
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(pageUrl);
      await page.waitForSelector('script');
      const content = JSON.stringify(await page.content());

      //Transform all the data into an array so we can iterate over it
      const contentArray = content.split(' ');
      for (const element of contentArray) {
        //Find all the items that contains 'productId'

        if (element.includes('productId')) {
          const productElements = element.split('\\');

          for (const [index, productElement] of productElements.entries()) {
            //Extract the productId

            if (productElement.includes('productId')) {
              const productId = productElements[index + 2].replace('"', '');
              //Build product page URL

              const productURL =
                'https://www.aliexpress.com/item/' + productId + '.html';

              productsURL.push(productURL);
            }
          }
        }
      }
      resolve(productsURL);
    });
  }
}
