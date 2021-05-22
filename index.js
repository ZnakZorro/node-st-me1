
let q = "https://www.yr.no/en/forecast/graph/2-3083828/Poland/West%20Pomerania/Szczecin/Szczecin%20D%C4%85bie";


const https = require('https');

let url ='https://www.yr.no/api/v0/locations/2-3083828/forecast'; // Dąbie
//let url ='https://www.yr.no/api/v0/locations/5-1220500/forecast'; // Szczecin 

const parsowanie=(body)=>{
  //console.log(body);
		for (var o in body){
			//console.log(o);
		}
    console.log("------------------------------");
		for (var o in body.longIntervals){
      let day = body.longIntervals[o];
			//console.log(o,day);
      
      let czas = (new Date(day.start)).toLocaleString('pl-PL');
      let deszcz = Math.max(day.precipitation.value,day.precipitation.min,day.precipitation.max);
      console.log(czas,"T=",day.temperature.value,"FL=",day.feelsLike.value,"  D="+deszcz+" mm");
      
      
		}

}

https.get(url,(res) => {
    let body = "";
    res.on("data", (chunk) => {
        body += chunk;
    });
    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            //console.log(json);
            parsowanie(json);
        } catch (error) {
            console.error(error.message);
        };
    });
}).on("error", (error) => {
    console.error(error.message);
});

/*
created
update
dayIntervals
shortIntervals
longIntervals
_links

dayIntervals={
  start: '2021-05-29T00:00:00+02:00',
  end: '2021-05-29T23:00:00+02:00',
  twentyFourHourSymbol: 'cloudy',
  twelveHourSymbols: [ 'cloudy', 'partlycloudy_day' ],
  sixHourSymbols: [ 'cloudy', 'cloudy', 'cloudy', 'partlycloudy_night' ],
  symbolConfidence: 'SomewhatCertain',
  precipitation: { value: 0, probability: 30 },
  temperature: { value: 15.7, min: 9, max: 15.7 },
  wind: { min: 1.5, max: 3.9 }
}


 longIntervals={
  symbol: { sunup: false, n: 4, clouds: 3, precip: 0 },
  symbolCode: { next6Hours: 'cloudy' },
  precipitation: { min: 0, max: 0, value: 0, pop: 24, probability: 24 },
  temperature: { value: 15.3, min: 14.2, max: 15.8 },
  wind: { direction: 286, speed: 3.7 },
  feelsLike: { value: 15.3 },
  pressure: { value: 1019 },
  cloudCover: { value: 96, high: 7, middle: 27, low: 87, fog: 0 },
  humidity: { value: 59.2 },
  dewPoint: { value: 7.3 },
  start: '2021-05-30T14:00:00+02:00',
  end: '2021-05-30T20:00:00+02:00'
}
*/
