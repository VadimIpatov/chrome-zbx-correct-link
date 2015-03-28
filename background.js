function showNotification(title, text, icon, timeout) {
    chrome.notifications.create(
      'zbx-correct-link',{   
          type: 'basic', 
          iconUrl: icon || 'icons/success48.png', 
          title: title, 
          message: text,
          priority: 0
        },
        function() { 
          setTimeout(function() {
            chrome.notifications.clear('zbx-correct-link', function(wasCleared) {});
          }, timeout || 1500);
        }
    ); 
}

chrome.browserAction.onClicked.addListener(function (tab) {
  // Check: this is a zabbix page
  if (tab.favIconUrl === "http://zabbix/images/general/zabbix.ico") {
    // Payload
    var correctURL = URI(tab.url).removeSearch("sid");
    // Copying to clipboard
    bg = chrome.extension.getBackgroundPage();
    clipboardholder= bg.document.getElementById("clipboardHolder");
    clipboardholder.style.display = "block";
    clipboardholder.value = correctURL;
    clipboardholder.select();
    bg.document.execCommand("Copy");
    clipboardholder.style.display = "none";
    showNotification('Correct zabbix link was copied to clipboard', correctURL.toString(), 'icons/success48.png', 2000);    
  } 
  else {
    showNotification('This is not a zabbix page', 'Clipboard was not changed', 'icons/warn48.png');
  }
});