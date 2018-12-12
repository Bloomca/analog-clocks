function startClocks() {
  const minutesArrow = document.getElementById("minutes");
  const secondsArrow = document.getElementById("seconds");

  if (!minutesArrow || !secondsArrow) {
    console.error("NO ARROWS!");
    return;
  }

  rotateArrows();
  setInterval(rotateArrows, 1000);

  function rotateArrows() {
    // JS does not guarantee execution time,
    // so it is better to create new system date
    // each time
    const currentTime = new Date();

    const minutes = currentTime.getMinutes();
    const seconds =
      currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

    rotateArrow({
      value: minutes,
      arrowElement: minutesArrow,
      multiplier: 12,
      topArrowOffset: 30
    });

    rotateArrow({
      value: seconds,
      arrowElement: secondsArrow,
      multiplier: 16.2,
      topArrowOffset: 20
    });
  }
}

startClocks();

function rotateArrow({ value, arrowElement, multiplier, topArrowOffset }) {
  const angle = value * 6;
  const mirroredAngle = angle > 180 ? 360 - angle : angle;

  arrowElement.style.transform = `rotate(${
    angle > 180 ? `-${360 - angle}` : angle
  }deg)`;

  const topOffset = (mirroredAngle / 180) * multiplier;

  arrowElement.style.top = `calc(${topOffset}% + 20px + ${topArrowOffset}%)`;

  if (angle >= 0 && angle <= 90) {
    arrowElement.style.left = `calc(50% - 2px + ${((angle / 90) * multiplier) /
      2}%)`;
  } else if (angle > 90 && angle <= 180) {
    const newAngle = (((180 - angle) / 90) * multiplier) / 2;
    arrowElement.style.left = `calc(50% - 2px + ${newAngle}%)`;
  } else if (angle > 180 && angle <= 270) {
    const newAngle = (((angle % 90) / 90) * multiplier) / 2;
    arrowElement.style.left = `calc(50% - 2px - ${newAngle}%)`;
  } else {
    const newAngle = (((360 - angle) / 90) * multiplier) / 2;
    arrowElement.style.left = `calc(50% - 2px - ${newAngle}%)`;
  }

  arrowElement.style.opacity = "1";
}
