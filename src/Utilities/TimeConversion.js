function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) {
      if(seconds === 1){
        return `${seconds} second ago`;

      }
      return `${seconds} seconds ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      if(minutes === 1){
        return `${minutes} minute ago`;

      }
      return `${minutes} minutes ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      if(hours === 1){
        return `${hours} hour ago`;

      }
      return `${hours} hours ago`;
    }
  
    const days = Math.floor(hours / 24);
    if (days < 30) {
      if(days === 1){
        return `${days} day ago`;

      }
      return `${days} days ago`;
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      if(months === 1){
        return `${months} month ago`;

      }
      return `${months} months ago`;
    }
  
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (seconds < 60) {
      if(seconds>10){
        return `00:${seconds}`
      }
        return `00:0${seconds}`;
    } else if (minutes < 60) {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}


  
  

  
  export {
    timeAgo,
    formatTime
  }