document.addEventListener("DOMContentLoaded", function() {
  
  var counters = document.querySelectorAll(".stat-value[data-target]");
  
  counters.forEach(function(counter) {
    
    var target = parseFloat(counter.getAttribute("data-target")); 
    var suffix = counter.getAttribute("data-suffix") || "";       
    var duration = 2000;                                          
    var stepTime = 20;                                           
    
    var current = 0;                                              
    var increment = target / (duration / stepTime);               

    var timer = setInterval(function() {
      current = current + increment;

      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer); 
      } else {
        if (target % 1 !== 0) {
          counter.textContent = current.toFixed(1) + suffix;
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }
    }, stepTime);

  });

});