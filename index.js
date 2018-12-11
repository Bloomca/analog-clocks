function startClocks() {
  const minutesArrow = document.getElementById("minutes");
  const secondsArrow = document.getElementById("seconds");

  if (!minutesArrow || !secondsArrow) {
    console.error("NO ARROWS!");
    return;
  }

  const SECONDS_OFFSET = 16;

  setInterval(function() {
    // JS does not guarantee execution time,
    // so it is better to create new system date
    // each time
    const currentTime = new Date();

    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const secondsAngle = seconds * 6;
    const mirroredAngle =
      secondsAngle > 180 ? 360 - secondsAngle : secondsAngle;

    secondsArrow.style.transform = `rotate(${
      secondsAngle > 180 ? `-${360 - secondsAngle}` : secondsAngle
    }deg)`;

    const topOffset = (mirroredAngle / 180) * SECONDS_OFFSET;

    secondsArrow.style.top = `calc(20% + 20px + ${topOffset}%)`;

    if (secondsAngle >= 0 && secondsAngle <= 90) {
      secondsArrow.style.left = `calc(50% - 2px + ${((secondsAngle / 90) *
        SECONDS_OFFSET) /
        2}%)`;
    } else if (secondsAngle > 90 && secondsAngle <= 180) {
      const newAngle = (((180 - secondsAngle) / 90) * SECONDS_OFFSET) / 2;
      secondsArrow.style.left = `calc(50% - 2px + ${newAngle}%)`;
    } else if (secondsAngle > 180 && secondsAngle <= 270) {
      const newAngle = (((secondsAngle % 90) / 90) * SECONDS_OFFSET) / 2;
      secondsArrow.style.left = `calc(50% - 2px - ${newAngle}%)`;
    } else {
      const newAngle = (((360 - secondsAngle) / 90) * SECONDS_OFFSET) / 2;
      secondsArrow.style.left = `calc(50% - 2px - ${newAngle}%)`;
    }
  }, 1000);
}

startClocks();
