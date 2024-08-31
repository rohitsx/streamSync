import style from "./logo.module.css"

export default function Logo() {
    return <div className={style.logoContainer}>
        <div className={style.logo}>
            <div className={style.wave}></div>
            <div className={style.wave}></div>
            <div className={style.wave}></div>
        </div>
        <div className={style.text}>stream<span>Sync</span></div>
    </div>
}