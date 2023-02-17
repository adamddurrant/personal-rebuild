import styles from ".//postTile.module.css";
import util from "../../styles/util.module.css";

export default function PostTile({ title, content, url, tags }) {
  return (
    <a
      href={"posts/" + url}
      rel='noopener noreferrer'
      className={styles.container}
    >
      <div className={styles.stack}>
        <div>
          <span className={tags[0].color + "Tag tag"}>{tags[0].name}</span>

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
