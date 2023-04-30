// ==UserScript==
// @name         noVNC Paste for Proxmox (Firefox)
// @namespace    http://tampermonkey.net/
// @version      0.2a
// @description  Pastes text into a noVNC window (for use with Proxmox specifically) on Firefox Browsers
// @author       Tempus Thales
// @match        https://*
// @include      /^.*novnc.*/
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==
const delay = 1
;(function () {
    'use strict'
    window.sendString = function(text) {

        var el = document.getElementById("canvas-id")
        text.split("").forEach(x=>{
            setTimeout(()=>{
                 var needs_shift = x.match(/[A-Z!@#$%^&*()_+{}:\"<>?~|]/)
                 let evt
                 if (needs_shift) {

                     evt = new KeyboardEvent("keydown", {keyCode: 16})
                     el.dispatchEvent(evt)
                     evt = new KeyboardEvent("keydown", {key: x, shiftKey: true})
                     el.dispatchEvent(evt)
                     evt = new KeyboardEvent("keyup", {keyCode: 16})
                     el.dispatchEvent(evt)

                 }else{
                     evt = new KeyboardEvent("keydown", {key: x})
                }
                el.dispatchEvent(evt)
            }, delay)
        })

    }


    $(document).ready(function() {
        setTimeout(()=>{
            console.log("Starting up noVNC Copy/Paste (for Proxmox)")

            $("canvas").attr("id", "canvas-id")

            $("canvas").on("mousedown", (e)=>{
                if(e.button == 2){ // Right Click
                    navigator.clipboardRead().then(text =>{
                    // navigator.clipboard.readText().then(text =>{
                        window.sendString(text)
                    })
                }
            })
        }, 1000);
    })


})()
