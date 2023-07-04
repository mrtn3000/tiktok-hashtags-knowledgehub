# How to run this project

* clone this repository
* install [miniconda](https://docs.conda.io/en/latest/miniconda.html)
* setup conda environment: `cd tiktok-hashtags-knowledgehub && conda env create -f tt-hashtag-conda-environment.yml`
* install [nodejs](https://nodejs.org/en)
* setup scraping environment: `npm install`
* run scraper `node scrape_tiktok_withDB.js`
* start jupyter to analyse the data `cd .. && jupyter lab`