import styles from ".//postTile.module.css";
import util from "../../styles/util.module.css";
import Image from "next/image";

export default function PostTile({
  title,
  content,
  url,
  tags,
  date,
  imageUrl,
}) {
  return (
    <a
      href={"posts/" + url}
      rel='noopener noreferrer'
      className={styles.container}
    >
      <div className={styles.image}>
        <Image
          // unoptimized
          priority
          src={imageUrl}
          width={64}
          height={64}
          layout='fixed'
          alt={title}
        />
      </div>

      <div className={styles.stack} style={{ marginLeft: "2rem" }}>
        <div>
          <span className={tags[0].color + "Tag tag"}>{tags[0].name}</span>
          <hr className={styles.separate}></hr>
          <h3
            className={util.tileTitle + " " + styles.inline + " " + styles.top}
          >
            {title}
          </h3>
          <span className={styles.externalIcon}>↗</span>
        </div>
        <p className={util.tileContent}>{content}</p>
      </div>
    </a>
  );
}
