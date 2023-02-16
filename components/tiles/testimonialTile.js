import styles from ".//testimonialTile.module.css";
import util from "../../styles/util.module.css";
import Link from "next/link";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function TestimonialTile({ profileUrl, title, content, url }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.stack}>
          <span className={util.viewTruncated}>
            {content.map((e, i) => (
              <a key={i} href={e.href}>
                {e.plain_text}
              </a>
            ))}
          </span>
          <div className={styles.iconContainer}>
            <Image
              className={styles.icon}
              priority
              unoptimized
              src={profileUrl}
              height={28}
              width={28}
              alt={title}
            />
          </div>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.titleLink}
          >
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </a>
        </div>
      </div>
    </>
  );
}
