import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Recrutement</h1>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Accueil</TabsTrigger>
          <TabsTrigger value="candidates">Candidats</TabsTrigger>
          <TabsTrigger value="jobs">Postes</TabsTrigger>
          <TabsTrigger value="matchings">Matchings</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">CV Reçus</h2>
                <p className="text-2xl">128</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">Entretiens planifiés</h2>
                <p className="text-2xl">14</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">Matchs parfaits</h2>
                <p className="text-2xl">5</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Candidates */}
        <TabsContent value="candidates">
          <div className="space-y-4">
            <Input placeholder="Rechercher un candidat..." className="max-w-sm" />
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">Alice Dupont</h3>
                  <p>Compétences : React, Node.js</p>
                  <Button className="mt-2">Voir Profil</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">Jean Martin</h3>
                  <p>Compétences : Python, Machine Learning</p>
                  <Button className="mt-2">Voir Profil</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Jobs */}
        <TabsContent value="jobs">
          <div className="space-y-4">
            <Input placeholder="Rechercher un poste..." className="max-w-sm" />
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">Développeur Full Stack</h3>
                  <p>Compétences requises : React, Node.js</p>
                  <Button className="mt-2">Voir les candidats</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">Data Scientist</h3>
                  <p>Compétences requises : Python, Machine Learning</p>
                  <Button className="mt-2">Voir les candidats</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Matchings */}
        <TabsContent value="matchings">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Meilleurs profils pour vos postes</h2>
            <Card>
              <CardContent className="p-4">
                <p><strong>Poste :</strong> Data Scientist</p>
                <p><strong>Candidat :</strong> Jean Martin</p>
                <p><strong>Score :</strong> 92%</p>
                <Button className="mt-2">Contacter</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
