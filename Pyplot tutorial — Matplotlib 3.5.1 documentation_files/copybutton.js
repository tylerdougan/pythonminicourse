const messages={'en':{'copy':'Copy','copy_to_clipboard':'Copy to clipboard','copy_success':'Copied!','copy_failure':'Failed to copy',},'es':{'copy':'Copiar','copy_to_clipboard':'Copiar al portapapeles','copy_success':'¡Copiado!','copy_failure':'Error al copiar',},'de':{'copy':'Kopieren','copy_to_clipboard':'In die Zwischenablage kopieren','copy_success':'Kopiert!','copy_failure':'Fehler beim Kopieren',},'fr':{'copy':'Copier','copy_to_clipboard':'Copié dans le presse-papier','copy_success':'Copié !','copy_failure':'Échec de la copie',},'ru':{'copy':'Скопировать','copy_to_clipboard':'Скопировать в буфер','copy_success':'Скопировано!','copy_failure':'Не удалось скопировать',},'zh-CN':{'copy':'复制','copy_to_clipboard':'复制到剪贴板','copy_success':'复制成功!','copy_failure':'复制失败',}}
let locale='en'
if(document.documentElement.lang!==undefined&&messages[document.documentElement.lang]!==undefined){locale=document.documentElement.lang}
let doc_url_root=DOCUMENTATION_OPTIONS.URL_ROOT;if(doc_url_root=='#'){doc_url_root='';}
const path_static=`${doc_url_root}_static/`;const runWhenDOMLoaded=cb=>{if(document.readyState!='loading'){cb()}else if(document.addEventListener){document.addEventListener('DOMContentLoaded',cb)}else{document.attachEvent('onreadystatechange',function(){if(document.readyState=='complete')cb()})}}
const codeCellId=index=>`codecell${index}`
const clearSelection=()=>{if(window.getSelection){window.getSelection().removeAllRanges()}else if(document.selection){document.selection.empty()}}
const temporarilyChangeTooltip=(el,oldText,newText)=>{el.setAttribute('data-tooltip',newText)
el.classList.add('success')
setTimeout(()=>el.setAttribute('data-tooltip',oldText),2000)
setTimeout(()=>el.classList.remove('success'),2000)}
const temporarilyChangeIcon=(el)=>{img=el.querySelector("img");img.setAttribute('src',`${path_static}check-solid.svg`)
setTimeout(()=>img.setAttribute('src',`${path_static}copy-button.svg`),2000)}
const addCopyButtonToCodeCells=()=>{if(window.ClipboardJS===undefined){setTimeout(addCopyButtonToCodeCells,250)
return}
const codeCells=document.querySelectorAll('div.highlight pre')
codeCells.forEach((codeCell,index)=>{const id=codeCellId(index)
codeCell.setAttribute('id',id)
const clipboardButton=id=>`<button class="copybtn o-tooltip--left" data-tooltip="${messages[locale]['copy']}" data-clipboard-target="#${id}">
      <img src="${path_static}copy-button.svg" alt="${messages[locale]['copy_to_clipboard']}">
    </button>`
codeCell.insertAdjacentHTML('afterend',clipboardButton(id))})
function escapeRegExp(string){return string.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function formatCopyText(textContent,copybuttonPromptText,isRegexp=false,onlyCopyPromptLines=true,removePrompts=true,copyEmptyLines=true,lineContinuationChar="",hereDocDelim=""){var regexp;var match;var useLineCont=!!lineContinuationChar
var useHereDoc=!!hereDocDelim
if(isRegexp){regexp=new RegExp('^('+copybuttonPromptText+')(.*)')}else{regexp=new RegExp('^('+escapeRegExp(copybuttonPromptText)+')(.*)')}
const outputLines=[];var promptFound=false;var gotLineCont=false;var gotHereDoc=false;const lineGotPrompt=[];for(const line of textContent.split('\n')){match=line.match(regexp)
if(match||gotLineCont||gotHereDoc){promptFound=regexp.test(line)
lineGotPrompt.push(promptFound)
if(removePrompts&&promptFound){outputLines.push(match[2])}else{outputLines.push(line)}
gotLineCont=line.endsWith(lineContinuationChar)&useLineCont
if(line.includes(hereDocDelim)&useHereDoc)
gotHereDoc=!gotHereDoc}else if(!onlyCopyPromptLines){outputLines.push(line)}else if(copyEmptyLines&&line.trim()===''){outputLines.push(line)}}
if(lineGotPrompt.some(v=>v===true)){textContent=outputLines.join('\n');}
if(textContent.endsWith("\n")){textContent=textContent.slice(0,-1)}
return textContent}
var copyTargetText=(trigger)=>{var target=document.querySelector(trigger.attributes['data-clipboard-target'].value);return formatCopyText(target.innerText,'',false,true,true,true,'','')}
const clipboard=new ClipboardJS('.copybtn',{text:copyTargetText})
clipboard.on('success',event=>{clearSelection()
temporarilyChangeTooltip(event.trigger,messages[locale]['copy'],messages[locale]['copy_success'])
temporarilyChangeIcon(event.trigger)})
clipboard.on('error',event=>{temporarilyChangeTooltip(event.trigger,messages[locale]['copy'],messages[locale]['copy_failure'])})}
runWhenDOMLoaded(addCopyButtonToCodeCells)