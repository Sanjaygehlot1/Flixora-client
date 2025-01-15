function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
  
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} days ago`;
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} months ago`;
    }
  
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  }
  
  

  
  export {timeAgo}