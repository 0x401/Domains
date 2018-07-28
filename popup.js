let bg=chrome.extension.getBackgroundPage();
let domains=bg.domains;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let currentTab = tabs[0]; 
  let current_domains = domains[currentTab.id];
  let domain_list=document.querySelector("#domain_list");
  for(let key in current_domains){
	let li = document.createElement("li");
	console.log("!"+current_domains[key]);
	li.innerText = current_domains[key];
	console.log(li);
	domain_list.appendChild(li);
  }
});