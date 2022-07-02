package main

import (
	"encoding/json"
	"image/jpeg"
	"log"
	"net/http"
	"os"

	"github.com/nfnt/resize"
)

type FileName struct {
	Name string
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func resizeHandler(w http.ResponseWriter, r *http.Request) {
	var fileName FileName
	if err := json.NewDecoder(r.Body).Decode(&fileName); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
	}
	defer r.Body.Close()

	file, err := os.Open("./static/" + fileName.Name)
	checkError(err)

	img, err := jpeg.Decode(file)
	checkError(err)
	file.Close()

	m := resize.Thumbnail(720, 360, img, resize.NearestNeighbor)

	out, err := os.Create(fileName.Name)
	checkError(err)

	jpeg.Encode(out, m, nil)
	out.Close()

	defer w.Write([]byte("Done"))
	err = os.Rename("./"+fileName.Name, "./static/"+fileName.Name)
	checkError(err)
}

func main() {
	http.HandleFunc("/resize", resizeHandler)
	err := http.ListenAndServe(":6001", nil)
	checkError(err)
}
