var domains={};
let fiter=["chrome:","chrome-extension:"];
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status=="loading") domains[tabId]=[] ;
	});
function add_domain(tabId,domain){
	if(domains[tabId]){
		if(!domains[tabId].includes(domain)){
			domains[tabId].unshift(domain);
			}
	}else{
		domains[tabId] =[];
		add_domain(tabId,domain);
	}	
}
chrome.webRequest.onResponseStarted.addListener(function(info){
	for(let key in info){
		let domain = info.url.split("/")[2];
		if(info.tabId!=-1){
		add_domain(info.tabId,domain);
		chrome.browserAction.setBadgeText({
			text: domains[info.tabId].length.toString(),tabId:info.tabId
		});
		}
	}
},
{urls: ["<all_urls>"]},
[]
);
