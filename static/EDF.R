
#Load required packages (The required packages must first be installed via R-Studio)
library(edfReader)
library(jsonlite)

#Path needs to be adapted to local iom_manager/static directory
libDir <- "C:/Users/stmo/iom_manager/static"

#Input from r-script (name of the edf-file)
list <- input[[1]]

#Load EDF
MEPtest <- paste(libDir, list$name, sep='')
CHdr <- readEdfHeader(MEPtest)

#Read singals
TSignals <-readEdfSignals(CHdr, simplify=FALSE ,fragments = TRUE)

#Convert output to json
toJSON(TSignals, force = TRUE)



