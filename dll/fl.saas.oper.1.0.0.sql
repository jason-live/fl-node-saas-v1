/*
  Navicat Premium Data Transfer

  Source Server         : MySQL
  Source Server Type    : MySQL
  Source Server Version : 50721
  Source Host           : 127.0.0.1:3306
  Source Schema         : fl_saas_oper

  Target Server Type    : MySQL
  Target Server Version : 50721
  File Encoding         : 65001

  Date: 23/06/2019 18:19:58
*/

-- CREATE TABLE fso_XX (
--   id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
--   create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
--   update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
--   create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
--   update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
--   deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
--   PRIMARY KEY (`id`) USING BTREE,
--   UNIQUE KEY `xx_unique` (`xx`) USING BTREE
--   INDEX `idx_order_id`(`order_id`) USING BTREE,
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='XX表';



CREATE TABLE fso_account (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  account varchar(50) NOT NULL COMMENT '账号',
  password varchar(256) NOT NULL COMMENT '密码',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(2) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  user_id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_account_unique` (`user_id`, `account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号表';


CREATE TABLE fso_user(
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  username varchar(50) NOT NULL COMMENT '姓名',
  mobile varchar(50) DEFAULT NULL COMMENT '手机号',
  email varchar(50) DEFAULT NULL COMMENT '邮箱',
  disabled tinyint(2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态：0、可用 1、禁用',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(2) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
