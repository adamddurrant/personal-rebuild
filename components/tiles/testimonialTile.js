import styles from ".//testimonialTile.module.css";
import util from "../../styles/util.module.css";
import Image from "next/image";



export default function TestimonialTile({ profileUrl, title, content, url }) {
  return (
    <>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.container}
      >
        <div className={util.viewTruncated}>
          {content.map((e, i) => (
            <span className={styles.testimonial} key={i} href={e.href}>
              {e.plain_text}
            </span>
          ))}
        </div>
        <div className={styles.iconContainer}>
          <Image
            className={styles.icon}
            priority
            unoptimized
            src={profileUrl}
            height={38}
            width={38}
            alt={title}
          />
        </div>
        <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
        <span className={styles.externalIcon}>↗</span>
      </a>
    </>
  );
}
