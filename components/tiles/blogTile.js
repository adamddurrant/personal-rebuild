import styles from "./blogTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";

export default function BlogTile({ imageUrl, title, content, url, tags, fav }) {
  //Checks if link is external to open in a new tab
  const target = url.includes("www.") ? "_blank" : null;
  console.log(target);
  const slugConcat = "posts/" + url;
  const preSlug = url.includes("www.") ? url : slugConcat;
  return (
    <>
      <a
        href={preSlug}
        rel='noopener noreferrer'
        target={target}
        className={styles.container}
      >
        <div>
          <Image
            // unoptimized
            className={styles.image}
            priority
            src={imageUrl}
            width={288}
            height={150}
            layout='responsive'
            alt={title}
          />
        </div>

        <div className={styles.stack}>
          <div>
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </div>
          <p className={styles.content}>{content}</p>
        </div>
      </a>
    </>
  );
}
