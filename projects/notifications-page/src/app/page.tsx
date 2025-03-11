"use client";

import styles from "../styles/page.module.scss";
import getUsers from "../data/api/users";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User, Notification } from "../types";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const randomBoolean = () => Math.random() < 0.5;

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(7);
      const notificationDescriptions = await import(
        "../data/local/notificationStatus.json"
      ).then((res) => res.default || []);
      const notificationMessages = await import(
        "../data/local/notificationMessages.json"
      ).then((res) => res.default || []);
      const avatars = await import("../data/local/avatars.json").then(
        (res) => res.default || []
      );

      const initialNotifications = users.map((user: User, index: number) => ({
        id: index + 1,
        user_name: user.name,
        title: `New message from ${user.name}`,
        description:
          notificationDescriptions[
            randomNumber(0, notificationDescriptions.length)
          ] || "No status",
        message: randomBoolean()
          ? notificationMessages[randomNumber(0, notificationMessages.length)]
          : false,
        quote:
          index === 2
            ? "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
            : "",
        reactToImage: index === 3 ? "/static/image-chess.webp" : null,
        timestamp: `${randomNumber(
          2,
          notificationDescriptions.length
        )} days ago`,
        image: avatars[index] || "",
        read: randomBoolean(),
      }));

      setNotifications(initialNotifications);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.left}>
          <h2>Notifications</h2>
          <div className={styles.notificationCount}>
            <span>{notifications.filter((n) => !n.read).length}</span>
          </div>
        </div>
        <div className={styles.right}>
          <span>Mark all as read</span>
        </div>
      </header>
      <section className={styles.notification_container}>
        {notifications.map((notification) => (
          <div
            className={`${styles.notification} ${
              notification.read
                ? styles.notification_time_status_read
                : styles.notification_time_status_unread
            }`}
            key={notification.id}
          >
            <div className={styles.profile_picture}>
              <Image src={notification.image} alt="" width={32} height={32} />
            </div>
            <div className={styles.notification_description}>
              <div className={styles.notification_message}>
                <p>
                  <span>
                    <b>{notification.user_name}</b>
                  </span>
                  <span>{notification.description}</span>
                  {notification.message && (
                    <span>
                      <b>{notification.message}</b>
                    </span>
                  )}
                </p>
              </div>
              <div className={styles.timestamp}>
                <span>{notification.timestamp}</span>
              </div>
              {notification.quote && (
                <div className={styles.notification_quote}>
                  {notification.quote}
                </div>
              )}
            </div>
            {notification.reactToImage && (
              <Image
                src={notification.reactToImage}
                className={styles.image}
                alt=""
                width={32}
                height={32}
              />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
