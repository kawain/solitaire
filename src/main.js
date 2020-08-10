import images from './img/*.svg'

const imgArr = [
    "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13",
    "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13",
    "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12", "h13",
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13",
    "ura"
]

let start, yamafuda, kumifuda, bafuda, cardArrLen, cardArr, dragNow

// 配列をシャッフル
// https://qiita.com/komaji504/items/62a0f8ea43053e90555a
function arrayShuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1))
        var tmp = a[i]
        a[i] = a[r]
        a[r] = tmp
    }
    return a
}

// 初期化
function init() {
    yamafuda[0].innerHTML = ""
    yamafuda[1].innerHTML = ""

    kumifuda[0].innerHTML = "♣"
    kumifuda[1].innerHTML = "♦"
    kumifuda[2].innerHTML = "♥"
    kumifuda[3].innerHTML = "♠"

    for (const v of bafuda) {
        v.innerHTML = ""
    }

    const tmp = [...Array(cardArrLen).keys()]
    cardArr = []
    for (const v of arrayShuffle(tmp)) {
        cardArr.push(imgArr[v])
    }

    dragNow = null

    // console.table(cardArr)
    lineUp()
}

// 山札、場札裏面
function makeBack(name, yama = false) {
    const img = document.createElement("img")
    // img.src = `img/ura.svg`
    img.src = images["ura"]
    img.style.width = "100px"
    img.setAttribute("draggable", false)

    if (yama) {
        img.addEventListener("click", openYamafuda)
    }

    const div = document.createElement("div")
    div.id = name
    div.classList.add("card", "ura")
    div.setAttribute("draggable", false)
    div.appendChild(img)

    return div
}

// 山札表面
function makeYamafudaFront(name) {
    // <div id="s1" class="card" draggable="true"><img src="cards/s1.png" draggable="false"> 新しい要素はここに入る </div>
    const img = document.createElement("img")
    // img.src = `img/${name}.svg`
    img.src = images[name]
    img.style.width = "100px"
    img.setAttribute("draggable", false)

    const div = document.createElement("div")
    div.id = name
    div.className = "card"
    div.setAttribute("draggable", true)
    div.dataset.state = "on"
    div.appendChild(img)
    // ドラッグイベント追加
    div.addEventListener("dragstart", dragStart)
    div.addEventListener("dragend", dragEnd)

    return div
}

// クリックで山札の裏を表にする
function openYamafuda(e) {
    e.stopPropagation()
    const id = e.target.parentNode.id
    e.target.parentNode.remove()
    yamafuda[1].appendChild(makeYamafudaFront(id))
}

// 場札の裏を表にする
function openBafuda(dom) {
    const id = dom.id
    dom.classList.remove("ura")
    dom.setAttribute("draggable", true)
    // dom.childNodes[0].src = `img/${id}.svg`
    dom.childNodes[0].src = images[id]
    // ドラッグのイベント
    dom.addEventListener("dragstart", dragStart)
    dom.addEventListener("dragend", dragEnd)
    // ドロップのイベント
    dom.addEventListener("dragover", dragOver)
    dom.addEventListener("drop", cardDrop)
}

// 最初の並べ
function lineUp() {
    // 1列目 0
    const tmp0 = makeBack(cardArr[0])
    setTimeout(() => {
        bafuda[0].appendChild(tmp0)
    }, 100)

    // 2列目 1 2
    const tmp1 = makeBack(cardArr[1])
    const tmp2 = makeBack(cardArr[2])
    tmp2.appendChild(tmp1)
    setTimeout(() => {
        bafuda[1].appendChild(tmp2)
    }, 200)

    // 3列目 3 4 5
    const tmp3 = makeBack(cardArr[3])
    const tmp4 = makeBack(cardArr[4])
    const tmp5 = makeBack(cardArr[5])
    tmp4.appendChild(tmp3)
    tmp5.appendChild(tmp4)
    setTimeout(() => {
        bafuda[2].appendChild(tmp5)
    }, 300)

    // 4列目 6 7 8 9
    const tmp6 = makeBack(cardArr[6])
    const tmp7 = makeBack(cardArr[7])
    const tmp8 = makeBack(cardArr[8])
    const tmp9 = makeBack(cardArr[9])
    tmp7.appendChild(tmp6)
    tmp8.appendChild(tmp7)
    tmp9.appendChild(tmp8)
    setTimeout(() => {
        bafuda[3].appendChild(tmp9)
    }, 400)

    // 5列目 10 11 12 13 14
    const tmp10 = makeBack(cardArr[10])
    const tmp11 = makeBack(cardArr[11])
    const tmp12 = makeBack(cardArr[12])
    const tmp13 = makeBack(cardArr[13])
    const tmp14 = makeBack(cardArr[14])
    tmp11.appendChild(tmp10)
    tmp12.appendChild(tmp11)
    tmp13.appendChild(tmp12)
    tmp14.appendChild(tmp13)
    setTimeout(() => {
        bafuda[4].appendChild(tmp14)
    }, 500)

    // 6列目 15 16 17 18 19 20
    const tmp15 = makeBack(cardArr[15])
    const tmp16 = makeBack(cardArr[16])
    const tmp17 = makeBack(cardArr[17])
    const tmp18 = makeBack(cardArr[18])
    const tmp19 = makeBack(cardArr[19])
    const tmp20 = makeBack(cardArr[20])
    tmp16.appendChild(tmp15)
    tmp17.appendChild(tmp16)
    tmp18.appendChild(tmp17)
    tmp19.appendChild(tmp18)
    tmp20.appendChild(tmp19)
    setTimeout(() => {
        bafuda[5].appendChild(tmp20)
    }, 600)

    // 7列目 21 22 23 24 25 26 27
    const tmp21 = makeBack(cardArr[21])
    const tmp22 = makeBack(cardArr[22])
    const tmp23 = makeBack(cardArr[23])
    const tmp24 = makeBack(cardArr[24])
    const tmp25 = makeBack(cardArr[25])
    const tmp26 = makeBack(cardArr[26])
    const tmp27 = makeBack(cardArr[27])
    tmp22.appendChild(tmp21)
    tmp23.appendChild(tmp22)
    tmp24.appendChild(tmp23)
    tmp25.appendChild(tmp24)
    tmp26.appendChild(tmp25)
    tmp27.appendChild(tmp26)
    setTimeout(() => {
        bafuda[6].appendChild(tmp27)
    }, 700)

    // カードを開く
    const openCard = [tmp0, tmp1, tmp3, tmp6, tmp10, tmp15, tmp21]
    let timeCount = 1000
    for (const v of openCard) {
        timeCount += 100
        setTimeout(() => {
            openBafuda(v)
        }, timeCount)
    }

    // 残りは山札
    setTimeout(() => {
        for (let i = 28; i < cardArrLen; i++) {
            yamafuda[0].appendChild(makeBack(cardArr[i], true))
        }
    }, 2000)

    // 組札のイベント club, diamond, heart, spade
    kumifuda[0].addEventListener("dragover", dragOver)
    kumifuda[0].addEventListener("drop", clubDrop)
    kumifuda[1].addEventListener("dragover", dragOver)
    kumifuda[1].addEventListener("drop", diamondDrop)
    kumifuda[2].addEventListener("dragover", dragOver)
    kumifuda[2].addEventListener("drop", heartDrop)
    kumifuda[3].addEventListener("dragover", dragOver)
    kumifuda[3].addEventListener("drop", spadeDrop)
}

// クリックで山札を全部裏にする
function bundleAgain() {
    let tmp = yamafuda[1].childNodes
    if (tmp.length > 0) {
        for (let i = tmp.length - 1; i >= 0; i--) {
            yamafuda[0].appendChild(makeBack(tmp[i].id, true))
        }
        yamafuda[1].innerHTML = ""
    }
}

// ドラッグ
function dragStart(e) {
    dragNow = e.target
    const state = e.target.dataset.state
    if (state === "on") {
        setTimeout(() => {
            this.style.display = "none"
        }, 0)
    }
}

// ドラッグ終了
function dragEnd() {
    dragNow = null
    if (this.style.display === "none") {
        this.style.display = "block"
    }
}

// ドラッグオーバー
function dragOver(e) {
    e.preventDefault()
}

// function dragEnter(e) {
//     e.preventDefault();
//     console.log("dragEnter")
// }

// function dragLeave() {
//     console.log("dragLeave")
// }

// ドロップ1　場札の表カードにドロップ
function cardDrop(e) {
    e.stopPropagation()
    const child = e.target.parentNode.childNodes
    // デフォルトでimgが1つあるので
    if (child.length === 1) {
        if (dragNow) {
            // ドロップできるかの確認　色違い　数字が1つ多い
            // 置くカード
            let mark1 = dragNow.id.slice(0, 1)
            let num1 = parseInt(dragNow.id.slice(1))
            let color1 = "black"
            if (mark1 === "d" || mark1 === "h") {
                color1 = "red"
            }

            // 下のカード
            let mark2 = e.target.parentNode.id.slice(0, 1)
            let num2 = parseInt(e.target.parentNode.id.slice(1))
            let color2 = "black"
            if (mark2 === "d" || mark2 === "h") {
                color2 = "red"
            }

            if (color1 === color2) {
                return
            }

            if (num1 + 1 !== num2) {
                return
            }

            dragNow.dataset.state = "off"
            // ドロップのイベント追加
            dragNow.addEventListener("dragover", dragOver)
            dragNow.addEventListener("drop", cardDrop)
            e.target.parentNode.appendChild(dragNow)
            dragNow = null
            chechBafuda()
        }
    }
}

// ドロップ2　空の場札に先頭が13のカード列だけドロップ
function bafudaDrop(e) {
    const child = e.target.childNodes
    if (child.length === 0) {
        if (dragNow) {
            // 13 のみ
            if (parseInt(dragNow.id.slice(1)) !== 13) {
                return
            }
            dragNow.dataset.state = "off"
            // ドロップのイベント追加
            dragNow.addEventListener("dragover", dragOver)
            dragNow.addEventListener("drop", cardDrop)
            e.target.appendChild(dragNow)
            dragNow = null
            chechBafuda()
        }
    }
}

// ドロップ3　組札のドロップ　この時ドロップ1のイベントは削除
function commonDrop3(e) {
    let mark1, num1, mark2, num2
    // 置くカード
    mark1 = dragNow.id.slice(0, 1)
    num1 = parseInt(dragNow.id.slice(1))

    // 下のカード
    if (e.target.parentNode.id) {
        mark2 = e.target.parentNode.id.slice(0, 1)
        num2 = parseInt(e.target.parentNode.id.slice(1))
    }

    // console.log("mark1", mark1)
    // console.log("num1", num1)
    // console.log("mark2", mark2)
    // console.log("num2", num2)

    return [mark1, num1, mark2, num2]
}

// クラブ用
function clubDrop(e) {
    let mark1, num1, mark2, num2

    [mark1, num1, mark2, num2] = commonDrop3(e)

    if (mark1 !== "c") {
        return
    }

    if (!num2) {
        if (num1 !== 1) {
            return
        }
    } else {
        if (num1 - 1 !== num2) {
            return
        }
    }

    dragNow.removeEventListener("dragover", dragOver)
    dragNow.removeEventListener("drop", cardDrop)
    this.appendChild(dragNow)
    dragNow = null
    chechBafuda()
    checkGameClear()
}

// ダイヤ用
function diamondDrop(e) {
    let mark1, num1, mark2, num2

    [mark1, num1, mark2, num2] = commonDrop3(e)

    if (mark1 !== "d") {
        return
    }

    if (!num2) {
        if (num1 !== 1) {
            return
        }
    } else {
        if (num1 - 1 !== num2) {
            return
        }
    }

    dragNow.removeEventListener("dragover", dragOver)
    dragNow.removeEventListener("drop", cardDrop)
    this.appendChild(dragNow)
    dragNow = null
    chechBafuda()
    checkGameClear()
}

// ハート用
function heartDrop(e) {
    let mark1, num1, mark2, num2

    [mark1, num1, mark2, num2] = commonDrop3(e)

    if (mark1 !== "h") {
        return
    }

    if (!num2) {
        if (num1 !== 1) {
            return
        }
    } else {
        if (num1 - 1 !== num2) {
            return
        }
    }

    dragNow.removeEventListener("dragover", dragOver)
    dragNow.removeEventListener("drop", cardDrop)
    this.appendChild(dragNow)
    dragNow = null
    chechBafuda()
    checkGameClear()
}

// スペード用
function spadeDrop(e) {
    let mark1, num1, mark2, num2

    [mark1, num1, mark2, num2] = commonDrop3(e)

    if (mark1 !== "s") {
        return
    }

    if (!num2) {
        if (num1 !== 1) {
            return
        }
    } else {
        if (num1 - 1 !== num2) {
            return
        }
    }

    dragNow.removeEventListener("dragover", dragOver)
    dragNow.removeEventListener("drop", cardDrop)
    this.appendChild(dragNow)
    dragNow = null
    chechBafuda()
    checkGameClear()
}

// 場札に全て裏面の列があれば、表にする
function chechBafuda() {
    for (const v of bafuda) {
        if (v.childNodes.length === 0) {
            // ドロップのイベント追加
            v.addEventListener("dragover", dragOver)
            v.addEventListener("drop", bafudaDrop)
            continue
        }

        let child = v.childNodes[0]
        while (true) {
            if (child.childNodes.length === 1) {
                if (child.classList.contains("ura")) {
                    // 表にする
                    openBafuda(child)
                }
                break
            }
            child = child.childNodes[1]
        }
    }
}

// ゲームクリア
function checkGameClear() {
    let count = 0
    // すべての組札の子供が14ならば
    for (const v of kumifuda) {
        count += v.childNodes.length
    }

    if (count === 4 * 14) {
        alert("Game clear")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    start = document.getElementById("start")
    yamafuda = document.querySelectorAll(".yamafuda")
    kumifuda = document.querySelectorAll(".kumifuda")
    bafuda = document.querySelectorAll(".bafuda")

    start.addEventListener("click", init)
    yamafuda[0].addEventListener("click", bundleAgain)

    let count = imgArr.length
    cardArrLen = count - 1

    for (const v in images) {
        const img = new Image()
        img.onload = function () {
            count--
            if (count === 0) {
                start.removeAttribute("disabled")
            }
        }
        // img.src = `img/${v}.svg`
        img.src = images[v]
    }
})
