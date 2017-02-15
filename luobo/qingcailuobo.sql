# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 182.254.132.17 (MySQL 5.5.53-0ubuntu0.14.04.1)
# Database: qingcailuobo
# Generation Time: 2017-02-15 11:36:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_user`;

CREATE TABLE `admin_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `firstname` varchar(32) DEFAULT NULL COMMENT 'User First Name',
  `lastname` varchar(32) DEFAULT NULL COMMENT 'User Last Name',
  `email` varchar(128) DEFAULT NULL COMMENT 'User Email',
  `username` varchar(40) DEFAULT NULL COMMENT 'User Login',
  `password` varchar(100) DEFAULT NULL COMMENT 'User Password',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'User Created Time',
  `modified` timestamp NULL DEFAULT NULL COMMENT 'User Modified Time',
  `logdate` timestamp NULL DEFAULT NULL COMMENT 'User Last Login Time',
  `lognum` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'User Login Number',
  `reload_acl_flag` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Reload ACL',
  `is_active` smallint(6) NOT NULL DEFAULT '1' COMMENT 'User Is Active',
  `extra` text COMMENT 'User Extra Data',
  `rp_token` text COMMENT 'Reset Password Link Token',
  `rp_token_created_at` timestamp NULL DEFAULT NULL COMMENT 'Reset Password Link Token Creation Date',
  `failures_num` smallint(6) DEFAULT '0' COMMENT 'Failure Number',
  `first_failure` timestamp NULL DEFAULT NULL COMMENT 'First Failure',
  `lock_expires` timestamp NULL DEFAULT NULL COMMENT 'Expiration Lock Dates',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UNQ_ADMIN_USER_USERNAME` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Admin User Table';



# Dump of table attachment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attachment`;

CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `old_name` varchar(200) DEFAULT NULL,
  `new_name` varchar(200) DEFAULT NULL,
  `ext_name` varchar(30) DEFAULT NULL,
  `mime_type` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `url` tinytext,
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(30) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `ref_id` (`ref_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table blog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blog`;

CREATE TABLE `blog` (
  `id` char(32) NOT NULL COMMENT '主键，UUID作为键值',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `summary` text NOT NULL COMMENT '摘要',
  `content` text NOT NULL COMMENT 'markdown格式的内容，用于重新编辑',
  `commentNum` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `heartNum` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `readNum` int(11) NOT NULL DEFAULT '0' COMMENT '阅读数',
  `publishTime` datetime NOT NULL COMMENT '文章创建时间',
  `url` varchar(100) NOT NULL COMMENT '文章相对URL',
  `signature` char(32) NOT NULL COMMENT '文章哈希签名，防止出现重复文章',
  `categoryID` char(32) NOT NULL COMMENT '文章类别ID',
  `lastUpdateTime` datetime NOT NULL COMMENT '文章上次修改时间',
  `path` varchar(100) NOT NULL COMMENT '静态化的文件磁盘路径',
  `coverURL` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '博文类型，0表示普通博文，1表示富博文(带封面图片)',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '博文状态，0显示，1不显示，2草稿',
  `statusName` varchar(20) DEFAULT NULL COMMENT '状态名称：显示，不显示，草稿',
  `html` text NOT NULL COMMENT 'html格式的博文，主要用于重新静态化',
  `tags` varchar(256) DEFAULT NULL COMMENT '博文标签',
  `shareNum` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table blog_back_display
# ------------------------------------------------------------

DROP VIEW IF EXISTS `blog_back_display`;

CREATE TABLE `blog_back_display` (
   `categoryName` VARCHAR(50) NOT NULL,
   `id` CHAR(32) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `author` VARCHAR(50) NOT NULL,
   `commentNum` INT(11) NOT NULL DEFAULT '0',
   `readNum` INT(11) NOT NULL DEFAULT '0',
   `url` VARCHAR(100) NOT NULL,
   `publishTime` DATETIME NOT NULL,
   `type` INT(11) NOT NULL DEFAULT '0',
   `status` INT(11) NOT NULL DEFAULT '0',
   `statusName` VARCHAR(20) NULL DEFAULT NULL,
   `heartNum` INT(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM;



# Dump of table blog_display
# ------------------------------------------------------------

DROP VIEW IF EXISTS `blog_display`;

CREATE TABLE `blog_display` (
   `categoryName` VARCHAR(50) NOT NULL,
   `id` CHAR(32) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `author` VARCHAR(50) NOT NULL,
   `summary` TEXT NOT NULL,
   `commentNum` INT(11) NOT NULL DEFAULT '0',
   `readNum` INT(11) NOT NULL DEFAULT '0',
   `url` VARCHAR(100) NOT NULL,
   `publishTime` DATETIME NOT NULL,
   `type` INT(11) NOT NULL DEFAULT '0',
   `status` INT(11) NOT NULL DEFAULT '0',
   `coverURL` VARCHAR(255) NULL DEFAULT NULL,
   `heartNum` INT(11) NOT NULL DEFAULT '0',
   `tags` VARCHAR(256) NULL DEFAULT NULL,
   `typeName` VARCHAR(50) NULL DEFAULT NULL,
   `typeID` INT(11) UNSIGNED NOT NULL DEFAULT '0',
   `categoryID` CHAR(32) NOT NULL,
   `content` TEXT NOT NULL
) ENGINE=MyISAM;



# Dump of table blog_display_by_tag
# ------------------------------------------------------------

DROP VIEW IF EXISTS `blog_display_by_tag`;

CREATE TABLE `blog_display_by_tag` (
   `categoryName` VARCHAR(50) NOT NULL,
   `id` CHAR(32) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `author` VARCHAR(50) NOT NULL,
   `summary` TEXT NOT NULL,
   `commentNum` INT(11) NOT NULL DEFAULT '0',
   `readNum` INT(11) NOT NULL DEFAULT '0',
   `url` VARCHAR(100) NOT NULL,
   `publishTime` DATETIME NOT NULL,
   `type` INT(11) NOT NULL DEFAULT '0',
   `status` INT(11) NOT NULL DEFAULT '0',
   `coverURL` VARCHAR(255) NULL DEFAULT NULL,
   `heartNum` INT(11) NOT NULL DEFAULT '0',
   `tags` VARCHAR(256) NULL DEFAULT NULL,
   `typeName` VARCHAR(50) NULL DEFAULT NULL,
   `typeID` INT(11) UNSIGNED NOT NULL DEFAULT '0',
   `categoryID` CHAR(32) NOT NULL,
   `tagID` CHAR(32) NOT NULL,
   `tagName` VARCHAR(50) NOT NULL
) ENGINE=MyISAM;



# Dump of table blog_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blog_tags`;

CREATE TABLE `blog_tags` (
  `tagID` char(32) NOT NULL,
  `blogID` char(32) NOT NULL,
  PRIMARY KEY (`tagID`,`blogID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` char(32) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cdate` datetime DEFAULT NULL,
  `typeID` int(11) DEFAULT '1',
  `keywords` varchar(50) DEFAULT '',
  `blogNum` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` char(32) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `cdate` datetime NOT NULL,
  `likeNum` int(11) NOT NULL DEFAULT '0',
  `hateNum` int(11) NOT NULL DEFAULT '0',
  `parent` char(32) DEFAULT NULL,
  `blogID` char(32) NOT NULL,
  `shareNum` int(11) NOT NULL DEFAULT '0',
  `replyNum` int(11) NOT NULL DEFAULT '0',
  `headURL` varchar(100) DEFAULT NULL,
  `check` int(11) DEFAULT '0' COMMENT '是否审核，0表示未审核，1表示审核',
  `status` int(11) DEFAULT '1' COMMENT '是否合法，0未通过，1通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `receiver` int(11) NOT NULL,
  `sender` int(11) DEFAULT NULL,
  `sender_name` varchar(50) DEFAULT NULL,
  `send_time` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receiver_id` (`receiver`),
  KEY `sender_id` (`sender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table notice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` mediumtext NOT NULL,
  `start` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end` datetime NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0,不可见，1可见',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` char(32) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table timeline
# ------------------------------------------------------------

DROP TABLE IF EXISTS `timeline`;

CREATE TABLE `timeline` (
  `id` varchar(20) NOT NULL COMMENT '主键',
  `createdDate` datetime NOT NULL COMMENT '创建时间',
  `displayName` varchar(30) NOT NULL COMMENT '显示名称',
  `displayDate` datetime DEFAULT NULL COMMENT '显示日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table track_login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `track_login`;

CREATE TABLE `track_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `login_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `login_ip` varchar(39) NOT NULL DEFAULT '',
  `logout_date` datetime DEFAULT NULL,
  `session_id` char(32) DEFAULT NULL,
  `browser` char(20) DEFAULT NULL,
  `user_agent` tinytext,
  PRIMARY KEY (`id`),
  KEY `login_user_id` (`login_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `type`;

CREATE TABLE `type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `nickname` varchar(30) DEFAULT '游客',
  `headurl` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headurl`)
VALUES
  (737,'admin','E10ADC3949BA59ABBE56E057F20F883E','胡建洪','n');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table user_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_permission`;

CREATE TABLE `user_permission` (
  `user_id` varchar(32) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `permission` int(11) NOT NULL,
  `permission_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;



# Dump of table user_register
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_register`;

CREATE TABLE `user_register` (
  `user_id` varchar(32) NOT NULL,
  `username` varchar(50) NOT NULL,
  `reg_status` tinyint(4) DEFAULT '0',
  `ref_user_id` varchar(32) DEFAULT '0',
  `firstname` varchar(60) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT '1',
  `reg_date` datetime DEFAULT '0000-00-00 00:00:00',
  `reg_ip` char(15) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  `description` tinytext,
  PRIMARY KEY (`user_id`),
  KEY `username` (`username`),
  KEY `ref_user_id` (`ref_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table youlian
# ------------------------------------------------------------

DROP TABLE IF EXISTS `youlian`;

CREATE TABLE `youlian` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `cdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





# Replace placeholder table for blog_display with correct view syntax
# ------------------------------------------------------------

DROP TABLE `blog_display`;

CREATE ALGORITHM=UNDEFINED DEFINER=`luobo`@`%` SQL SECURITY DEFINER VIEW `blog_display`
AS SELECT
   `category`.`name` AS `categoryName`,
   `blog`.`id` AS `id`,
   `blog`.`title` AS `title`,
   `blog`.`author` AS `author`,
   `blog`.`summary` AS `summary`,
   `blog`.`commentNum` AS `commentNum`,
   `blog`.`readNum` AS `readNum`,
   `blog`.`url` AS `url`,
   `blog`.`publishTime` AS `publishTime`,
   `blog`.`type` AS `type`,
   `blog`.`status` AS `status`,
   `blog`.`coverURL` AS `coverURL`,
   `blog`.`heartNum` AS `heartNum`,
   `blog`.`tags` AS `tags`,
   `type`.`name` AS `typeName`,
   `type`.`id` AS `typeID`,
   `category`.`id` AS `categoryID`,
   `blog`.`content` AS `content`
FROM ((`category` join `blog`) join `type`) where ((`category`.`id` = `blog`.`categoryID`) and (`category`.`typeID` = `type`.`id`));


# Replace placeholder table for blog_back_display with correct view syntax
# ------------------------------------------------------------

DROP TABLE `blog_back_display`;

CREATE ALGORITHM=UNDEFINED DEFINER=`luobo`@`%` SQL SECURITY DEFINER VIEW `blog_back_display`
AS SELECT
   `category`.`name` AS `categoryName`,
   `blog`.`id` AS `id`,
   `blog`.`title` AS `title`,
   `blog`.`author` AS `author`,
   `blog`.`commentNum` AS `commentNum`,
   `blog`.`readNum` AS `readNum`,
   `blog`.`url` AS `url`,
   `blog`.`publishTime` AS `publishTime`,
   `blog`.`type` AS `type`,
   `blog`.`status` AS `status`,
   `blog`.`statusName` AS `statusName`,
   `blog`.`heartNum` AS `heartNum`
FROM (`category` join `blog`) where (`category`.`id` = `blog`.`categoryID`);


# Replace placeholder table for blog_display_by_tag with correct view syntax
# ------------------------------------------------------------

DROP TABLE `blog_display_by_tag`;

CREATE ALGORITHM=UNDEFINED DEFINER=`luobo`@`%` SQL SECURITY DEFINER VIEW `blog_display_by_tag`
AS SELECT
   `category`.`name` AS `categoryName`,
   `blog`.`id` AS `id`,
   `blog`.`title` AS `title`,
   `blog`.`author` AS `author`,
   `blog`.`summary` AS `summary`,
   `blog`.`commentNum` AS `commentNum`,
   `blog`.`readNum` AS `readNum`,
   `blog`.`url` AS `url`,
   `blog`.`publishTime` AS `publishTime`,
   `blog`.`type` AS `type`,
   `blog`.`status` AS `status`,
   `blog`.`coverURL` AS `coverURL`,
   `blog`.`heartNum` AS `heartNum`,
   `blog`.`tags` AS `tags`,
   `type`.`name` AS `typeName`,
   `type`.`id` AS `typeID`,
   `category`.`id` AS `categoryID`,
   `tags`.`id` AS `tagID`,
   `tags`.`name` AS `tagName`
FROM ((((`category` join `blog`) join `type`) join `blog_tags`) join `tags`) where ((`category`.`id` = `blog`.`categoryID`) and (`category`.`typeID` = `type`.`id`) and (`blog_tags`.`blogID` = `blog`.`id`) and (`blog_tags`.`tagID` = `tags`.`id`));

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
