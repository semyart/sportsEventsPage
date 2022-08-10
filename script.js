let mainIndex;
const debouncedHandleClick = debounce(handleClick, 1000);

function handleClick(event, indexFromWheelEvent) {
  if (event && mainIndex !== +this.dataset.curMainIndex) {
    const curMainIndex = this.dataset.curMainIndex;
    selectHexagon(mainIndex, curMainIndex);
  } else if (indexFromWheelEvent !== undefined) {
    selectHexagon(mainIndex, indexFromWheelEvent);
  }
};

window.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    if (events[mainIndex + 1]) {
      debouncedHandleClick(null, mainIndex + 1);
    }
  } else if (event.deltaY > 0) {
    if (events[mainIndex - 1]) {
      debouncedHandleClick(null, mainIndex - 1);
    }
  }
})

function renderEvents(events, mainId) {
  mainIndex = events.findIndex((item) => {
    return item.id === mainId;
  });

  //рендер основного гексагона
  const hexagon = document.createElement('div');
  hexagon.classList.add("hexagon", "hexagon-main");
  hexagon.dataset.curMainIndex = mainIndex;

  const spanLocation = document.createElement('span');
  spanLocation.textContent = events[mainIndex].location;
  spanLocation.classList.add("hexagon__text", "text-location");

  const spanDate = document.createElement('span');
  spanDate.textContent = events[mainIndex].date;
  spanDate.classList.add("hexagon__text", "text-date");

  const spanTime = document.createElement('span');
  spanTime.textContent = events[mainIndex].time;
  spanTime.classList.add("hexagon__text", "text-time");

  const buyLinkButton = document.createElement('a');
  buyLinkButton.href = "#";
  buyLinkButton.textContent = 'Купить билет';
  buyLinkButton.classList.add("hexagon__link-button");
  hexagon.addEventListener('click', debouncedHandleClick);

  hexagon.append(spanLocation, spanDate, spanTime, buyLinkButton);

  //рендер средних гексагонов
  const hexagonMidLeft = document.createElement('div');
  const spanDateMidLeft = document.createElement('span');
  hexagonMidLeft.classList.add("hexagon", "hexagon-middle", "hexagon-middle_bottom");
  spanDateMidLeft.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
  spanDateMidLeft.textContent = events[mainIndex - 1].date;
  hexagonMidLeft.dataset.curMainIndex = mainIndex - 1;

  hexagonMidLeft.addEventListener('click', debouncedHandleClick);
  hexagonMidLeft.append(spanDateMidLeft);

  const hexagonMidRight = document.createElement('div');
  const spanDateMidRight = document.createElement('span');
  hexagonMidRight.classList.add("hexagon", "hexagon-middle", "hexagon-middle_top");
  spanDateMidRight.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
  spanDateMidRight.textContent = events[mainIndex + 1].date;
  hexagonMidRight.dataset.curMainIndex = mainIndex + 1;
  hexagonMidRight.addEventListener('click', debouncedHandleClick);
  hexagonMidRight.append(spanDateMidRight);

  //рендер маленьких гексагонов
  const hexagonSmallLeft = document.createElement('div');
  const spanDateSmallLeft = document.createElement('span');
  hexagonSmallLeft.classList.add("hexagon", "hexagon-small", "hexagon-small_bottom");
  spanDateSmallLeft.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
  spanDateSmallLeft.textContent = events[mainIndex - 2].date;
  hexagonSmallLeft.dataset.curMainIndex = mainIndex - 2;
  hexagonSmallLeft.addEventListener('click', debouncedHandleClick);
  hexagonSmallLeft.append(spanDateSmallLeft);

  const hexagonSmallRight = document.createElement('div');
  const spanDateSmallRight = document.createElement('span');
  hexagonSmallRight.classList.add("hexagon", "hexagon-small", "hexagon-small_top");
  spanDateSmallRight.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
  spanDateSmallRight.textContent = events[mainIndex + 2].date;
  hexagonSmallRight.dataset.curMainIndex = mainIndex + 2;
  hexagonSmallRight.append(spanDateSmallRight);
  hexagonSmallRight.addEventListener('click', debouncedHandleClick);

  const root = document.querySelector('.main');
  root.append(hexagon, hexagonMidLeft, hexagonMidRight, hexagonSmallLeft, hexagonSmallRight);

  // for (const event of events) {
  //   if (event.id === mainId) {
  //     const hexagon = document.createElement('div');

  //   }
  // }
}

function getMiddleEventId(events) {
  const arrayMiddleIndex = Math.floor(events.length / 2);
  return events[arrayMiddleIndex].id;
}

const events = [
  {
    id: "1",
    location: "Stadium",
    date: "18 june",
    time: "19:00",
    opponentFirst: "Op1",
    opponentSecond: "Op2"
  },
  {
    id: "2",
    location: "Stadium1",
    date: "20 june",
    time: "19:00",
    opponentFirst: "Op3",
    opponentSecond: "Op4"
  },
  {
    id: "3",
    location: "Stadium2",
    date: "22 june",
    time: "19:00",
    opponentFirst: "Op5",
    opponentSecond: "Op6"
  },
  {
    id: "4",
    location: "Stadium3",
    date: "26 june",
    time: "19:00",
    opponentFirst: "Op7",
    opponentSecond: "Op8"
  },
  {
    id: "5",
    location: "Stadium4",
    date: "28 june",
    time: "19:00",
    opponentFirst: "Op9",
    opponentSecond: "Op10"
  },
  {
    id: "6",
    location: "Stadium5",
    date: "30 june",
    time: "19:00",
    opponentFirst: "Op11",
    opponentSecond: "Op12"
  },
  {
    id: "7",
    location: "Stadium6",
    date: "31 june",
    time: "19:00",
    opponentFirst: "Op13",
    opponentSecond: "Op14"
  },
  {
    id: "8",
    location: "Stadium6",
    date: "2 july",
    time: "19:00",
    opponentFirst: "Op15",
    opponentSecond: "Op16"
  },
  {
    id: "8",
    location: "Stadium6",
    date: "4 july",
    time: "19:00",
    opponentFirst: "Op17",
    opponentSecond: "Op18"
  },
  {
    id: "8",
    location: "Stadium6",
    date: "9 july",
    time: "19:00",
    opponentFirst: "Op19",
    opponentSecond: "Op20"
  }
];

renderEvents(events, getMiddleEventId(events));

function selectHexagon(prevMainIndex, curMainIndex) {
  changeHexagonClasses(curMainIndex, curMainIndex - prevMainIndex);
};

function changeHexagonClasses(curMainIndex, isIndexHigher) {
  mainIndex = +curMainIndex;
  const smallRightHexagon = document.querySelector('.hexagon-small_top');
  const middleRightHexagon = document.querySelector('.hexagon-middle_top');
  const mainHexagon = document.querySelector('.hexagon-main');
  const middleLeftHexagon = document.querySelector('.hexagon-middle_bottom');
  const smallLeftHexagon = document.querySelector('.hexagon-small_bottom');

  mainHexagon.className = "";
  const prevMainDate = mainHexagon.querySelector('.text-date').textContent;
  mainHexagon.innerHTML = "";
  const newTextDate = document.createElement('span');
  newTextDate.classList.add('hexagon__text', 'text-date', 'hexagon__text_medium');
  newTextDate.textContent = prevMainDate;
  mainHexagon.append(newTextDate);

  if (isIndexHigher > 0) {
    if (isIndexHigher === 1) {
      if (middleRightHexagon) middleRightHexagon.className = "";
      if (middleLeftHexagon) middleLeftHexagon.className = "";
      if (smallRightHexagon) {
        // движение вниз по диагонали
        smallRightHexagon.className = "";
        smallRightHexagon.classList.add("hexagon", "hexagon-middle", "hexagon-middle_top");
      }
      mainHexagon.classList.add('hexagon', "hexagon-middle", "hexagon-middle_bottom");
      middleRightHexagon.classList.add("hexagon", "hexagon-main");
      if (middleLeftHexagon) middleLeftHexagon.classList.add("hexagon", "hexagon-small", "hexagon-small_bottom");
      if (smallLeftHexagon) {
        smallLeftHexagon.classList.add("delete-block-bottom-animation");
        setTimeout(() => {
          smallLeftHexagon.remove();
        }, 1000);
      }
    } else {
      if (smallLeftHexagon) {
        smallLeftHexagon.classList.add("delete-block-bottom-animation");
        setTimeout(() => {
          smallLeftHexagon.remove();
        }, 1000);
      }
      if (middleLeftHexagon) {
        middleLeftHexagon.classList.add("delete-block-bottom-animation");
        setTimeout(() => {
          middleLeftHexagon.remove();
        }, 1000);
      }
      if (middleRightHexagon) middleRightHexagon.className = "";
      if (middleLeftHexagon) middleLeftHexagon.className = "";
      smallRightHexagon.className = "";
      mainHexagon.classList.add("hexagon", "hexagon-small", "hexagon-small_bottom");
      middleRightHexagon.classList.add('hexagon', "hexagon-middle", "hexagon-middle_bottom");
      smallRightHexagon.classList.add("hexagon", "hexagon-main");
      if (events[+curMainIndex + 1]) {
        const middleRightHexagon = document.createElement('div');
        const spanDateMiddleRight = document.createElement('span');
        middleRightHexagon.classList.add("hexagon", "hexagon-middle", "hexagon-middle_top", "show-block-animation");
        spanDateMiddleRight.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
        spanDateMiddleRight.textContent = events[+curMainIndex + 1].date;
        middleRightHexagon.dataset.curMainIndex = +curMainIndex + 1;
        middleRightHexagon.addEventListener('click', debouncedHandleClick);
        middleRightHexagon.append(spanDateMiddleRight);
        const root = document.querySelector('.main');
        root.append(middleRightHexagon);
      }
    }

    if (events[+curMainIndex + 2]) {
      const hexagonSmallRight = document.createElement('div');
      const spanDateSmallRight = document.createElement('span');
      hexagonSmallRight.classList.add("hexagon", "hexagon-small", "hexagon-small_top", "show-block-top-animation");
      spanDateSmallRight.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
      spanDateSmallRight.textContent = events[+curMainIndex + 2].date;
      hexagonSmallRight.dataset.curMainIndex = +curMainIndex + 2;
      hexagonSmallRight.addEventListener('click', debouncedHandleClick);
      hexagonSmallRight.append(spanDateSmallRight);
      const root = document.querySelector('.main');
      root.append(hexagonSmallRight);
    }
  } else {
    if (isIndexHigher === -1) {
      if (middleRightHexagon) middleRightHexagon.className = "";
      if (middleLeftHexagon) middleLeftHexagon.className = "";
      if (smallLeftHexagon) {
        // движение вверх по диагонали
        smallLeftHexagon.className = "";
        smallLeftHexagon.classList.add("hexagon", "hexagon-middle", "hexagon-middle_bottom");
      }
      mainHexagon.classList.add('hexagon', "hexagon-middle", "hexagon-middle_top");
      middleLeftHexagon.classList.add("hexagon", "hexagon-main");
      if (middleRightHexagon) middleRightHexagon.classList.add("hexagon", "hexagon-small", "hexagon-small_top");
      if (smallRightHexagon) {
        smallRightHexagon.classList.remove('show-block-top-animation');
        smallRightHexagon.classList.add("delete-block-animation");
        setTimeout(() => {
          smallRightHexagon.remove();

        }, 1000);
      }
    } else {
      if (middleRightHexagon) {
        middleRightHexagon.classList.add("delete-block-animation");
        setTimeout(() => {
          middleRightHexagon.remove();
        }, 1000);
      }
      if (smallRightHexagon) {
        smallRightHexagon.classList.add("delete-block-animation");
        setTimeout(() => {
          smallRightHexagon.remove();
        }, 1000);
      }
      if (middleRightHexagon) middleRightHexagon.className = "";
      if (middleLeftHexagon) middleLeftHexagon.className = "";
      if (smallLeftHexagon) {
        smallLeftHexagon.className = "";
        smallLeftHexagon.classList.add("hexagon", "hexagon-main");
      }
      middleLeftHexagon.classList.add('hexagon', "hexagon-middle", "hexagon-middle_top");
      mainHexagon.classList.add("hexagon", "hexagon-small", "hexagon-small_top");
      if (events[+curMainIndex - 1]) {
        const middleLeftHexagon = document.createElement('div');
        const spanDateMediumLeft = document.createElement('span');
        middleLeftHexagon.classList.add("hexagon", "hexagon-middle", "hexagon-middle_bottom", "show-block-animation");
        spanDateMediumLeft.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
        spanDateMediumLeft.textContent = events[+curMainIndex - 1].date;
        middleLeftHexagon.dataset.curMainIndex = +curMainIndex - 1;
        middleLeftHexagon.addEventListener('click', debouncedHandleClick);
        middleLeftHexagon.append(spanDateMediumLeft);
        const root = document.querySelector('.main');
        root.append(middleLeftHexagon);
      }
    }

    if (events[+curMainIndex - 2]) {
      const hexagonSmallLeft = document.createElement('div');
      const spanDateSmallLeft = document.createElement('span');
      hexagonSmallLeft.classList.add("hexagon", "hexagon-small", "hexagon-small_bottom", "show-block-animation");
      spanDateSmallLeft.classList.add("hexagon__text", "text-date", "hexagon__text_medium");
      spanDateSmallLeft.textContent = events[+curMainIndex - 2].date;
      hexagonSmallLeft.dataset.curMainIndex = +curMainIndex - 2;
      hexagonSmallLeft.addEventListener('click', debouncedHandleClick);
      hexagonSmallLeft.append(spanDateSmallLeft);
      const root = document.querySelector('.main');
      root.append(hexagonSmallLeft);
    }
  }

  setTimeout(() => {
    const newMainHexagon = document.querySelector('.hexagon-main');
    newMainHexagon.innerHTML = "";

    const spanLocation = document.createElement('span');
    spanLocation.textContent = events[mainIndex].location;
    spanLocation.classList.add("hexagon__text", "text-location", 'opacity-animation');

    const spanDate = document.createElement('span');
    spanDate.textContent = events[mainIndex].date;
    spanDate.classList.add("hexagon__text", "text-date", 'opacity-animation');

    const spanTime = document.createElement('span');
    spanTime.textContent = events[mainIndex].time;
    spanTime.classList.add("hexagon__text", "text-time", 'opacity-animation');

    const buyLinkButton = document.createElement('a');
    buyLinkButton.href = "#";
    buyLinkButton.textContent = 'Купить билет';
    buyLinkButton.classList.add("hexagon__link-button", 'opacity-animation');

    newMainHexagon.append(spanLocation, spanDate, spanTime, buyLinkButton);

    document.querySelector('#first-opponent').textContent = events[curMainIndex].opponentFirst;
    document.querySelector('#second-opponent').textContent = events[curMainIndex].opponentSecond;
  }, 1000);

  //renderEvents(events, events[curMainIndex].id);
}

function debounce(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}
