package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/eikeon/web"
)

type Resource struct {
	Route *web.Route
}

func GetResource(route *web.Route, vars web.Vars) web.Resource {
	return &Resource{Route: route}
}

func (r *Resource) Title() string {
	return r.Route.Data["Title"]
}

var Root *string

func main() {
	Address := flag.String("address", ":9999", "http service address")
	Host := flag.String("host", "nogiushi.com", "")
	Root = flag.String("root", "dist", "...")

	flag.Parse()

	web.Root = Root

	getters := web.Getters{
		"home":   GetResource,
		"marvin": GetResource,
	}

	if h, err := web.Handler(*Host, getters); err == nil {
		server := &http.Server{Addr: *Address, Handler: h}
		log.Println("starting server on", server.Addr)
		if err := server.ListenAndServe(); err != nil {
			log.Println(err)
		}
	} else {
		log.Println(err)
	}

	if h, err := web.Handler(*Host, getters); err == nil {
		server := &http.Server{Addr: *Address, Handler: h}
		log.Println("starting server on", server.Addr)
		if err := server.ListenAndServe(); err != nil {
			log.Println(err)
		}
	} else {
		log.Println(err)
	}

}
