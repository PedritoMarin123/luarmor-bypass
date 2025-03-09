// ==UserScript==
// @name         Solar-Userscript - BYPASS LUAMOR
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Solar Team: @pedritomarin123 - @krain1771 - @htb1526
// @match        https://ads.luarmor.net/get_key?for=*
// @match        https://linkvertise.com/*
// @match        https://*/s?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=luarmor.net
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// @connect api.solar-x.top
// ==/UserScript==

(function () {
    'use strict';
    if (document.title.includes('Just a moment...') || document.title.includes('Just a second...') || document.title.includes('Hold') || document.title.includes('...')) {
        return;
    }
    if (window.location.hostname === "ads.luarmor.net") {
        if (window.getComputedStyle(document.getElementById('spinner')).display !== 'none') {
            const spinner = document.getElementById('spinner');
            const observer = new MutationObserver((mutations) => {
                if (window.getComputedStyle(spinner).display === 'none') {
                    observer.disconnect();
                }
            });
            observer.observe(spinner, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    console.log("starting");

    const requestapi = (url) => {
        return new Promise((resolve, reject) => {
            if (!url) return reject("URL not provided");

            GM_xmlhttpRequest({
                url: `https://api.solar-x.top/api/v3/bypass?url=${encodeURIComponent(url)}`,
                method: 'GET',
                onload: function (response) {
                    if (response.status === 200) {
                        try {
                            const result = JSON.parse(response.responseText);
                            console.log(result.result);
                            resolve(result.result);
                        } catch (error) {
                            reject("Error parsing response");
                        }
                    } else {
                        reject(`Request error: ${response.status}`);
                    }
                },
                onerror: function (error) {
                    reject("Request error");
                }
            });
        });
    };

    const simulateMouseClick = (element) => {
        if (element) element.click();
    };

    const renewKey = async (key) => {
        try {
            const hwid = new URLSearchParams(window.location.search).get('for').split('-').pop();
            const kit = localStorage.getItem(`_st_${hwid}`);
            if (!kit) throw new Error("Kit not found");

            const headers = {
                'Content-Type': 'application/json',
                'kittossntkn': kit,
                'kittosttkn': hwid,
                'trufflemayo': localStorage.getItem("trufflemayo") || ''
            };

            const renewResponse = await fetch('https://ads.luarmor.net/v/k', {
                method: 'DELETE',
                headers: headers
            });

            if (!renewResponse.ok) throw new Error(`HTTP error ${renewResponse.status}`);
            const renewData = await renewResponse.json();

            if (renewData.success) {
                console.log("Key renewed successfully:", renewData);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                console.error("Failed to renew key:", renewData);
            }
        } catch (error) {
            console.error("Error renewing key:", error);
        }
    };

    if (window.location.hostname === "ads.luarmor.net") {
        setTimeout(() => {
            console.log("sosal?");
            let hwid = new URLSearchParams(window.location.search).get('for').split('-');
            if (hwid.length === 2) {
                hwid = hwid[1];
            } else {
                hwid = hwid[0];
            }
            let kit = localStorage.getItem(`_st_${hwid}`);
            let pidor;
            let parsedValue;
            let head;
            if (localStorage.getItem("trufflemayo", null)) {
                head = { 'Content-Type': 'application/json', 'kittossntkn': kit, 'kittosttkn': hwid, "trufflemayo": localStorage.getItem("trufflemayo") };
            } else {
                head = { 'Content-Type': 'application/json', 'kittossntkn': kit, 'kittosttkn': hwid };
            }
            fetch('https://ads.luarmor.net/v/j', { method: 'GET', headers: head }).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP error ${r.status}`))).then(d => {
                pidor = JSON.parse(CH_341()[0](d.d)[0].value);
                console.log(pidor);
                let keys = Object.entries(pidor.cat_food.user_keys);
                let comp = pidor.cat_food.checkpoint_data.completed;
                let acke;
                let k = null;
                if (keys.length !== 0) {
                    keys.forEach(([key, value]) => {
                        const expirationDate = new Date(value.exp_at * 1000);
                        const currentTime = Date.now();
                        const isActive = value.exp_at * 1000 > currentTime;
                        k = key;
                        if (isActive) {
                            acke = true;
                            console.log('🎉 Already working key:', key);
                        }
                    });
                }
                if (acke === true) {
                    return;
                }
                if (comp === true) {
                    console.log("Мёд по телу");
                    if (k === null) {
                        simulateMouseClick(document.querySelector('#newkeybtn'));
                        return;
                    } else {
                        renewKey(k);
                    }
                } else {
                    simulateMouseClick(document.querySelector('#nextbtn'));
                    GM_setValue("BLYAIDINAXI!_SLR", true);
                }
            }).catch(e => console.error(e));
        }, 3000);
    } else if (window.location.hostname === "linkvertise.com" || window.location.hostname.includes("loot") || window.location.hostname.includes("links")) {
        const dik = GM_getValue("BLYAIDINAXI!_SLR", false);
        if (dik === true) {
            GM_setValue("BLYAIDINAXI!_SLR", false);
            const start = new Date().getTime();
            console.log(window.location.href);
            requestapi(window.location.href).then(data => {
                console.log("got");
                console.log(data);
                if (!data.includes("Error")) {
                    const time = 28000 - (new Date().getTime() - start);
                    if (time > 0) {
                        setTimeout(() => {
                            window.location = data;
                        }, time);
                    }
                }
            }).catch(error => {
                console.error(error);
            });
        }
    }
})();
