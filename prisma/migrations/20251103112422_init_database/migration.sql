-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` ENUM('M', 'F') NULL,
    `birthday` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `detail_address` VARCHAR(255) NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,

    INDEX `f_category_id`(`food_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `food_status` ADD CONSTRAINT `food_status_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_status` ADD CONSTRAINT `food_status_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
