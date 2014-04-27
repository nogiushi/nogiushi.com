package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/eikeon/web"
)

func GetData(r *web.Resource) web.TemplateData {
	return r
}

func main() {
	Address := flag.String("address", ":9999", "http service address")
	Root := flag.String("root", ".", "...")
	Static := flag.Bool("static", false, "serve static files")
	Add := flag.Bool("add", false, "add resources in resources.json")
	flag.Parse()

	rh := &web.ResourceHandler{Root: http.Dir(*Root), Static: *Static, Aliases: map[string]string{"dev.nogiushi.com": "nogiushi.com"}, GetData: GetData}
	if *Add {
		web.AddResources(*Root)
		//rh.Init("nogiushi-static", "nogiushi.com")
	}
	http.Handle("/", rh)

	server := &http.Server{Addr: *Address}
	log.Println("starting server on", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Println(err)
	}
}
