const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://medicalis.ma/substance/28";
async function fetchData() {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let dataList = [];
    $("p").each((index, element) => {
      let productElement = $(element).find("a#link");
      let productName = productElement.text().trim();
      let additionalInfoElement = $(element).find("span");
      let additionalInfo = additionalInfoElement.text().trim();

      console.log("Product Name:", productName);
      console.log("Additional Info:", additionalInfo);

      let productData = {
        product_name: productName,
        additional_info: additionalInfo,
      };
      dataList.push(productData);
    });
    fs.writeFileSync(
      "product_data.json",
      JSON.stringify(dataList, null, 4),
      "utf8"
    );
    console.log("Data has been saved to product_data.json");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
fetchData();
