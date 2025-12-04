-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `gender` ENUM('M', 'F') NULL,
    `birthday` DATETIME(0) NULL,
    `address` TEXT NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `status` ENUM('ACTIVE', 'DEACTIVATED') NULL,
    `email` TEXT NULL,
    `phone_number` TEXT NULL,
    `detail_address` TEXT NULL,
    `password` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_status` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `food_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    INDEX `user_id`(`user_id`),
    INDEX `food_id`(`food_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agreement` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `agreed` ENUM('Y', 'N') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agreement_status` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `agreement_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    INDEX `agreement_id`(`agreement_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `district` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `restaurant_id` BIGINT NOT NULL,
    `expire_at` DATETIME(6) NULL,
    `score` BIGINT NULL,

    INDEX `restaurant_id`(`restaurant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_photo` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `mission_id` BIGINT NOT NULL,

    INDEX `mission_id`(`mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_status` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `status` ENUM('ON_GOING', 'SUCCESS') NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `mission_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    INDEX `mission_id`(`mission_id`),
    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `mission_status_user_id_mission_id_key`(`user_id`, `mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `district_id` BIGINT NOT NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `district_id`(`district_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `content` TEXT NULL,
    `mission_status_id` BIGINT NOT NULL,

    INDEX `mission_status_id`(`mission_status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_photo` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `reiew_id` BIGINT NOT NULL,

    INDEX `review_id`(`reiew_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `food_status` ADD CONSTRAINT `food_status_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `food_status` ADD CONSTRAINT `food_status_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `agreement_status` ADD CONSTRAINT `agreement_status_ibfk_1` FOREIGN KEY (`agreement_id`) REFERENCES `agreement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `agreement_status` ADD CONSTRAINT `agreement_status_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_photo` ADD CONSTRAINT `mission_photo_ibfk_1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_status` ADD CONSTRAINT `mission_status_ibfk_1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_status` ADD CONSTRAINT `mission_status_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`mission_status_id`) REFERENCES `mission_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_photo` ADD CONSTRAINT `review_photo_ibfk_1` FOREIGN KEY (`reiew_id`) REFERENCES `review`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
