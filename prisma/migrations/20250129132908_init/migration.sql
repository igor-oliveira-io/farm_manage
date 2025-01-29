-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "document" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" SERIAL NOT NULL,
    "farmer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DECIMAL(10,2) NOT NULL,
    "arable_area" DECIMAL(10,2) NOT NULL,
    "vegetation_area" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantedCrop" (
    "id" TEXT NOT NULL,
    "harvest_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "production" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "PlantedCrop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Harvest_farm_id_year_key" ON "Harvest"("farm_id", "year");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantedCrop" ADD CONSTRAINT "PlantedCrop_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "Harvest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
