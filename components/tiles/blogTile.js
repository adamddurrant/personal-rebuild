import styles from "./blogTile.module.css";
import util from "../../styles/util.module.css";
import { Image } from "react-datocms"

export default function BlogTile({ image, staticImage, title, excerpt, url }) {
  //Checks if link is external to open in a new tab
  const target = url.includes("http") ? "_blank" : null;
  const slugConcat = "blog/" + url;
  const preSlug = url.includes("http") ? url : slugConcat;
  return (
    <>
      <a
        href={preSlug}
        rel='noopener noreferrer'
        target={target}
        className={styles.container}
      >
        <div>
          <Image data={staticImage ? staticImage : image.responsiveImage} style={{borderRadius: "6px"}} />
        </div>

        <div className={styles.stack}>
          <div>
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </div>
          <p className={styles.content}>{excerpt}</p>
        </div>
      </a>
    </>
  );
}
