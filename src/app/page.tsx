"use client";

import styles from "../styles/page.module.scss";
import getUsers from "../data/api/users";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  interface User {
    id: number;
    name: string;
    username: string;
    image: string;
  }

  interface Notification {
    id: number;
    user_name: string;
    title: string;
    description: string;
    timestamp: String;
    quote: String;
    read: boolean;
    image: string;
    reactToImage: string;
  }

  const unreadNotificationsCount = 3; // Example number of unread notifications. Replace with actual data.

  const [users, setUsers] = useState<User[]>([]);
  const [notificationStatus, setNotificationDescription] = useState<
    Array<string>
  >([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  async function getAvatar(): Promise<Array<string>> {
    try {
      const response = await import("../data/local/avatars.json");
      return response as Array<string>;
    } catch (err) {
      return [];
    }
  }

  async function getNotificationDescription(): Promise<Array<string>> {
    try {
      const response = await import("../data/local/notificationStatus.json");
      return response as Array<string>;
    } catch (err) {
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(7);
      setUsers(users);

      const notificationDescriptions = await getNotificationDescription();
      setNotificationDescription(notificationDescriptions);

      const avatars = await getAvatar();

      const initialNotifications = users.map((user: User, index: number) => {
        const description =
          notificationDescriptions[
            randomNumber(0, notificationDescriptions.length)
          ] || "No status";

        return {
          id: index + 1,
          user_name: user.name,
          title: `New message from ${user.name}`,
          description,
          quote:
            index === 2
              ? `Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.`
              : "",
          reactToImage: index === 3 ? "/static/image-chess.webp" : null,
          timestamp: String(randomNumber(2, notificationDescriptions.length)),
          image: avatars[index],
          read: Math.random() < 0.5,
        };
      });
      console.log(initialNotifications);
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
            <span>{unreadNotificationsCount}</span>
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
              <Image src={notification.image} alt="" width="32" height="32" />
            </div>
            <div className={styles.notification_description}>
              <div className={styles.notification_message}>
                <p>
                  <span>
                    <b>{notification.user_name}</b>
                  </span>
                  <span>{notification.description}</span>
                </p>
                {notification.read && <span>{notification.read}</span>}
              </div>
              <div className={styles.timestamp}>
                <span>{notification.timestamp} days ago</span>
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
                width="32"
                height="32"
              />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
