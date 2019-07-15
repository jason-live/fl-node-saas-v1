/*
  Navicat Premium Data Transfer

  Source Server         : MySQL
  Source Server Type    : MySQL
  Source Server Version : 50721
  Source Host           : 127.0.0.1:3306
  Source Schema         : fl_saas

  Target Server Type    : MySQL
  Target Server Version : 50721
  File Encoding         : 65001

  Date: 23/06/2019 18:19:58
*/

-- CREATE TABLE fs_XX (
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

-- ----------------------------
--  Table structure for `fs_enterprise`
--  企业信息
-- ----------------------------
CREATE TABLE fs_enterprise (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  enterprise_name varchar(50) NOT NULL UNIQUE COMMENT '企业名',
  enterprise_legal_person varchar(32) DEFAULT NULL COMMENT '企业法人',
  enterprise_uscc varchar(50) DEFAULT NULL UNIQUE COMMENT '统一社会信用代码',
  enterprise_tin varchar(50) DEFAULT NULL COMMENT '纳税人识别号',
  enterprise_rn varchar(50) DEFAULT NULL COMMENT '注册号',
  enterprise_oc varchar(50) DEFAULT NULL COMMENT '组织机构代码',
  enterprise_type varchar(50) DEFAULT NULL DEFAULT 0 COMMENT '企业类型',
  enterprise_scope text DEFAULT NULL COMMENT '经营范围',
  enterprise_industry varchar(128) DEFAULT NULL COMMENT '所属行业',
  enterprise_address varchar(256) DEFAULT NULL COMMENT '企业地址',
  enterprise_setup_date datetime DEFAULT NULL COMMENT '成立日期',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='企业信息表';

-- ----------------------------
--  Table structure for `fs_company`
--  公司
-- ----------------------------
CREATE TABLE fs_company (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  enterprise_id bigint(20) DEFAULT NULL COMMENT '公司ID（日期时间戳 + 3随机数）',
  type tinyint(8) NOT NULL DEFAULT 0 COMMENT '类型: 0、普通',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司表';

-- ----------------------------
--  Table structure for `fs_company_cft`
--  公司认证
-- ----------------------------
CREATE TABLE fs_company_cft (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  company_id bigint(20) NOT NULL UNIQUE COMMENT '公司ID（日期时间戳 + 3随机数）',
  license_url text DEFAULT NULL COMMENT '营业执照',
  remark varchar(256) DEFAULT NULL COMMENT '备注',
  status tinyint(4) NOT NULL DEFAULT 0 COMMENT '认证状态: 0、未认证 1、已认证',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司认证表';

-- ----------------------------
--  Table structure for `fs_store`
--  门店
-- ----------------------------
CREATE TABLE fs_store (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  company_id bigint(20) UNSIGNED NOT NULL COMMENT '公司ID（日期时间戳 + 3随机数）',
  store_name varchar(50) NOT NULL COMMENT '门店名',
  province varchar(50) NOT NULL COMMENT '省份',
  city varchar(50) NOT NULL COMMENT '城市',
  area varchar(50) NOT NULL COMMENT '区域',
  address varchar(256) NOT NULL COMMENT '地址',
  coordinate varchar(32) NOT NULL COMMENT '坐标',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门店表';

-- ----------------------------
--  Table structure for `fs_customer`
--  客户
-- ----------------------------
CREATE TABLE fs_customer (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  customer_name varchar(50) NOT NULL COMMENT '客户简称',
  enterprise_id bigint(20) UNSIGNED NOT NULL COMMENT '企业ID（日期时间戳 + 3随机数）',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户表';

-- ----------------------------
--  Table structure for `fs_supplier`
--  供应商
-- ----------------------------
CREATE TABLE fs_supplier (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  supplier_name varchar(50) NOT NULL COMMENT '供应商简称',
  enterprise_id bigint(20) UNSIGNED NOT NULL COMMENT '企业ID（日期时间戳 + 3随机数）',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='供应商表';


-- ----------------------------
--  Table structure for `fs_account`
--  账号
-- ----------------------------

CREATE TABLE fs_account (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  account varchar(50) NOT NULL COMMENT '账号',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `account_unique` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帐号表';

-- ----------------------------
--  Table structure for `fs_user`
--  用户
-- ----------------------------

CREATE TABLE fs_user (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  username varchar(50) NOT NULL COMMENT '用户名',
  mobile varchar(50) NOT NULL COMMENT '手机号',
  email varchar(50) NOT NULL COMMENT '邮箱',
  sex tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别：0、未知 1、男 2、女',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `mobile_unique` (`mobile`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
--  Table structure for `fs_role`
--  角色
-- ----------------------------
CREATE TABLE fs_role (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  role_name varchar(50) NOT NULL COMMENT UNIQUE '角色名',
  description varchar(256) NOT NULL COMMENT '角色描述',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
--  Table structure for `fs_dept`
--  部门
-- ----------------------------
CREATE TABLE fs_dept (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  parent_id bigint(20) NOT NULL DEFAULT 0 COMMENT 'ID（日期时间戳 + 3随机数）',
  dept_name varchar(50) NOT NULL COMMENT '部门名',
  description varchar(256) NOT NULL COMMENT '部门描述',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_parent_unique` (`id`, 'parent_id') USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门表';

-- ----------------------------
--  Table structure for `fs_permission`
--  权限
-- ----------------------------
CREATE TABLE fs_permission (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  permission_name varchar(50) NOT NULL COMMENT '权限名',
  description varchar(256) NOT NULL COMMENT '权限描述',
  type tinyint(8) NOT NULL DEFAULT 0 COMMENT '类型: 0、未知权限 1、角色权限 2、部门权限 3、菜单权限 4、系统权限',
  value varchar(50) NOT NULL COMMENT '权限值',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `type_value_unique` (`type`， `value`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
--  Table structure for `fs_brand`
--  品牌
-- ----------------------------
CREATE TABLE fs_brand (
  id bigint(20) UNSIGNED NOT NULL COMMENT 'ID（日期时间戳 + 3随机数）',
  brand_name varchar(50) NOT NULL COMMENT UNIQUE '品牌名',
  foreign_name varchar(50) NOT NULL COMMENT '品牌外文名',
  description text DEFAULT NULL COMMENT '品牌描述',
  logo text DEFAULT NULL COMMENT '品牌LOGO',
  country varchar(50) DEFAULT NULL COMMENT '国家',
  website text DEFAULT NULL COMMENT '品牌官网',
  type tinyint(8) NOT NULL DEFAULT 0 COMMENT '类型: 0、未知',
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  create_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录创建人',
  update_by bigint(20) NOT NULL DEFAULT 0 COMMENT '记录修改人',
  deleted tinyint(4) NOT NULL DEFAULT 0 COMMENT '类型: 0、未删除 1、删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='品牌表';






-- ----------------------------
--  Table structure for `fs_demand`
--  需求
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_bill`
--  单据
-- ----------------------------



-- ----------------------------
--  Table structure for `fs_category`
--  品类
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_attribute_key`
--  属性
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_attribute_value`
--  属性值
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_spu`
--  spu
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_sku`
--  sku
-- ----------------------------




-- ----------------------------
--  Table structure for `fs_work`
--  工单
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_process`
--  流程
-- ----------------------------

-- ----------------------------
--  Table structure for `fs_node`
--  节点
-- ----------------------------


-- ----------------------------
--  Table structure for `fs_node`
--  节点
-- ----------------------------


