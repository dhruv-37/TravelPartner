// if(input.value == )

document.querySelector("button").addEventListener("click", function() {
    clearInterval(carousel);
    var myValue = document.querySelector('#search').value;
    myValue = Number(myValue);
    document.querySelector('.main-content').innerHTML = "";
    let load = document.createElement('div');
    load.classList.add('loading');
    if(myValue > 112){
      document.querySelector('.main-content').appendChild(load);
      getHotel(myValue);
    }else{
      document.querySelector('.main-content').innerHTML = "";
      let err = document.createElement('p');
      err.innerHTML = "No Records Found!<br>Try adding a value greater than $112";
      err.classList.add('err');
      document.querySelector('.main-content').appendChild(err);
    }
})

let descend = false;
let alpha = false;
let alpharev = false;

let sortOpts = document.querySelectorAll('#side-sort li label');
let prev = document.querySelector('#lowtohigh');
for(sortOpt of sortOpts){
  
  sortOpt.addEventListener('click', function(event) {
    if(prev != this){
      prev = this;
      event.stopPropagation();
      if(this.innerHTML == "Price High to Low"){
        descend = !descend;
        alpha = false;
        alpharev = false;
      }else if(this.innerHTML == "Sort A to Z"){
        alpha = !alpha;
        descend = false;
        alpharev = false;
      }else{
        alpharev = !alpharev;
        descend = false;
        alpha = false;
      }
    }
    
  })
}

async function getHotel(myValue) {
    
    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '8934574bb5msh9ca1fcc98b40c47p171fc9jsn814faab92bae',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        },
        data: {
          currency: 'USD',
          eapid: 1,
          locale: 'en_US',
          siteId: 300000001,
          destination: {
            regionId: '6054439'
          },
          checkInDate: {
            day: 10,
            month: 10,
            year: 2022
          },
          checkOutDate: {
            day: 15,
            month: 10,
            year: 2022
          },
          rooms: [
            {
              adults: 2,
              children: [{age: 5}, {age: 7}]
            }
          ],
          resultsStartingIndex: 0,
          resultsSize: 200,
          sort: 'PRICE_LOW_TO_HIGH',
          filters: {
            price: {max: myValue , min: 100}
          }
        }
      };

    try {
        const response = await axios.request(options);
        let hotelArr = response.data.data.propertySearch.properties;
        if(descend == true){
          hotelArr.reverse();
        }else if(alpha == true){
          hotelArr = selectionSort(hotelArr, hotelArr.length);
          for(let i=0; i<hotelArr.length; i++){
            if(hotelArr[i].name[0] = " "){
              hotelArr.splice(i,1);
            }
          }
        }else if(alpharev == true){
          hotelArr = selectionSort(hotelArr, hotelArr.length);
          for(let i=0; i<hotelArr.length; i++){
            if(hotelArr[i].name[0] = " "){
              hotelArr.splice(i,1);
            }
          }
          hotelArr.reverse();
        }
        document.querySelector('.main-content').innerHTML = '';
        for(hotel of hotelArr){
            console.log(hotel);
            let hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel');
            hotelCard.innerHTML = `<div class="hotel-img">
            <img src="${hotel.propertyImage.image.url}" alt="hotel_img">
        </div>
        <div class="hotel-info">
            <div class="info-head">
                <div class="hotel-detail">
                    <h2 id="hotel-name">${hotel.name}</h2>
                    <p id="hotel-location">${hotel.neighborhood.name} &middot; ${hotel.destinationInfo.distanceFromDestination.value} mile</p>
                    <ul id="hotel-fac">
                        <li><i class='bx bx-check' style="color: black;font-weight: bold;"></i> 24x7 AC & room service</li>
                        <li><i class='bx bx-wifi-2' style="color: black;font-weight: bold;"></i> Free wifi available</li>
                        <li><i class='bx bxs-bowl-hot' style="color: black;font-weight: bold;"></i> Meals included</li>
                    </ul>
                </div>
                <div class="hotel-price">
                    <p id="disc_price" style="font-weight: bold;">${hotel.price.lead.formatted}</p>
                    <p id="act_price" style="text-decoration: line-through;font-weight: bold;">$${Math.ceil(hotel.price.lead.amount) + 56}</p>
                    <p id="taxes">+taxes & fees per night</p>
                    <button id="book">Book Hotel</button>
                </div>
            </div>
            <div class="info-foot">
                <p>Rating: ${hotel.reviews.score} out of 10</p>
                <p style="position: absolute; right: 1.5rem;">${hotel.reviews.total} reviews found</p>
            </div>
        </div>`;
        let check = Math.ceil(hotel.price.lead.amount);
        console.log(hotel);
        if(check <= myValue){
            document.querySelector('.main-content').appendChild(hotelCard);
        }
        };
        
    } catch (error) {
        document.querySelector('.main-content').innerHTML = "";
        let err = document.createElement('p');
        err.innerHTML = "No Records Found!<br>Try adding a value greater than $150";
        err.classList.add('err');

    }
}

let apiDoc = document.querySelector('.main-page button');

apiDoc.addEventListener('click', function() {
  window.open("https://rapidapi.com/apidojo/api/hotels4", "_blank");
})
let currIdx = 0;
let nextBtn = document.querySelector('.next');
nextBtn.addEventListener('click', function() {
  let carouselImg = ["https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg", "https://images7.alphacoders.com/362/362619.jpg", "https://c4.wallpaperflare.com/wallpaper/360/515/601/night-in-las-vegas-bellagio-luxury-hotel-casino-hd-wallpapers-for-mobile-phones-laptops-and-pc-1920%C3%971080-wallpaper-preview.jpg", "https://www.quirkybyte.com/wp-content/uploads/2016/08/1-100.jpg", "https://whatson.ae/dubai/wp-content/uploads/2019/04/rixos-the-palm.jpg", "https://images.pexels.com/photos/2403017/pexels-photo-2403017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"];
  let bgImg = document.querySelector('.main-page img');
  if(currIdx > carouselImg.length-1) {
    currIdx = (carouselImg.length - currIdx) ;
  }
  bgImg.setAttribute('src', carouselImg[currIdx]);
  currIdx++;
})

let carousel = setInterval(() => {
  let carouselImg = ["https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg", "https://images7.alphacoders.com/362/362619.jpg", "https://c4.wallpaperflare.com/wallpaper/360/515/601/night-in-las-vegas-bellagio-luxury-hotel-casino-hd-wallpapers-for-mobile-phones-laptops-and-pc-1920%C3%971080-wallpaper-preview.jpg", "https://www.quirkybyte.com/wp-content/uploads/2016/08/1-100.jpg", "https://whatson.ae/dubai/wp-content/uploads/2019/04/rixos-the-palm.jpg", "https://images.pexels.com/photos/2403017/pexels-photo-2403017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"];
  let bgImg = document.querySelector('.main-page img');
  if(currIdx > carouselImg.length-1) {
    currIdx = (carouselImg.length - currIdx) ;
  }
  bgImg.setAttribute('src', carouselImg[currIdx]);
  currIdx++;
}, 4000);

// SelectionSort
function swap(arr,xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
 
function selectionSort(arr,  n)
{
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++)
        if (arr[j].name[0] < arr[min_idx].name[0])
            min_idx = j;
 
        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
    }
    return arr;
}

