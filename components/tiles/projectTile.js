import styles from "./projectTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProjectTile({
  image,
  title,
  content,
  type,
  date,
  url,
  internal,
}) {
  return (
    <div className={styles.outer}>
      {/* <p className={styles.date}>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}
      </p> */}
      {internal ? (
        <Link href={"/projects/" + url}>
          <a className={styles.container}>
            <Image
              priority
              className={styles.image}
              src={"/projects/" + image + ".jpg"}
              width={400}
              height={220}
              layout='responsive'
              alt={title}
            />
            <div className={styles.stack}>
              <h3 className={util.tileTitle}>{title}</h3>
              <p className={util.tileContent}>{content}</p>
              <p className={styles.type}>{type}</p>
            </div>
          </a>
        </Link>
      ) : (
        <a
          href={url || "#"}
          onClick={(e) => {
            if (!url) {
              e.preventDefault();
              toast("Work in progress 🚧", {
                style: {
                  background: "#333",
                  color: "#fff",
                },
              });
            }
          }}
          target={url ? "_blank" : "_self"}
          rel='noopener noreferrer'
          className={styles.container}
        >
          <Image
            className={styles.image}
            priority
            src={"/projects/" + image + ".jpg"}
            width={400}
            height={220}
            layout='responsive'
            alt={title}
          />

          <div className={styles.stack}>
            <div className={styles.row}>
              <h3 className={util.tileTitle}>{title}</h3>
              <span className={styles.externalIcon}>↗</span>
            </div>

            <p className={util.tileContent}>{content}</p>
            <p className={styles.type}>{type}</p>
          </div>
        </a>
      )}
    </div>
  );
}
