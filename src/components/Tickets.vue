<template>
  <v-container>
    <v-row>
      <v-col v-for="(user, index) in users" :key="index" md="6" sm="6">
        <table width="100%" class="ticket page-break">
          <tr>
            <td width="30%" style="padding-right:10px;">
              <h3>Bouv'Run 2023</h3>
              <br>
              Ticket de tombola
              <br>
              Numéro <b>{{ index < 999 ? ('000' + (index + 1 + 300)).slice(-3) : index + 1 + 300 }}</b>
                  <br>
                  <br>
                  Identifiant <a href="#">bouvrun.fr/app</a> :
                  <br>
                  <br>
                  <div style="text-align:center;">
                    <b>{{ user.identifiant }}</b>
                  </div>
            </td>
            <td width="70%">
              <h3>Ticket n° {{ index < 999 ? ('000' + (index + 1 + 300)).slice(-3) : index + 1 + 300 }}</h3>
                  <br>
                  Nom :
                  ......................................................................................
                  <br>
                  Prénom :
                  ......................................................................................
                  <br>
                  Adresse Email ou Téléphone :
                  ......................................................................................
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main';

export default {
  data() {
    return {
      users: [],
    }
  },
  async created() {
    // Récupérer tous les documents de la collection "Users"
    const usersCollection = collection(db, "Users");
    const querySnapshot = await getDocs(usersCollection);

    var tableau = [
      "ETBE", "PDFW", "UKFX", "QBCW", "LWVS", "EMCU", "EHXQ", "KMKR", "YGQK", "KGBK",
      "FFMA", "FQCW", "HPYK", "QVYA", "SRWY", "MPHH", "BNAG", "YFYR", "GLSQ", "RDBW",
      "PHBT", "LQNG", "EZRG", "GHJD", "PAWA", "KPXU", "RAAZ", "TZGN", "ZVMD", "TNEN",
      "NGCH", "JAVF", "BVKR", "GJGW", "YSBW", "SXMG", "NLWM", "SWQT", "EYAT", "DBRG",
      "XACT", "PHGL", "GDDW", "CMLP", "CSVG", "JZJW", "FSFH", "XJNG", "VGBN", "PPGY",
      "CSBH", "UEQP", "BFJD", "DLRH", "ZRRC", "TKBC", "HZVV", "DNBJ", "GNBK", "KUXC",
      "FKCG", "QTVM", "ZANK", "KVFL", "ELYD", "XREW", "CUEH", "LNMV", "LBPV", "XAFU",
      "DHVY", "JZNZ", "SNHY", "GQEC", "FPJB", "RGZH", "EFQM", "YKVS", "ENPH", "SKUC",
      "LEVT", "WWFQ", "WNES", "VEJK", "JVJX", "HCWN", "QBBK", "TUKP", "VJUB", "EFFP",
      "LKPZ", "KFXC", "NTHQ", "WNCD", "BZFD", "GTRH", "YHQU", "NYKA", "PGSP", "XJVF",
      "AUZP", "UAVK", "SVSX", "TDBD", "VPHC", "LDUL", "XMEQ", "ZXYQ", "JUCH", "FENP",
      "RVBQ", "DYFS", "TCWK", "ZJAY", "TVCC", "FMQZ", "RYCF", "CLYE", "MRPZ", "PQGS",
      "BCCK", "TYXK", "BMEB", "VJVF", "PTAY", "GYLR", "JNDY", "DMQV", "AUNH", "AYXT",
      "SLEU", "AGPJ", "MDDB", "TJYU", "NSUS", "RPSD", "PTYM", "PWGZ", "SCPV", "YDBS",
      "ZJJF", "FHZB", "AWAP", "ZLKA", "AFHP", "TGLL", "AUAM", "WNKN", "VKJC", "ZKEU",
      "DBTW", "TRTN", "QSKC", "AQBR", "QZWL", "ZYWC", "XTJJ", "ZUCB", "HBRQ", "GHNP",
      "KKCS", "DNPK", "ZTCY", "FXTT", "AXDD", "AHJP", "WWTK", "RTFG", "SMGL", "ZQRD",
      "VNYQ", "FNRY", "TGXJ", "KEWV", "HQJL", "WUFN", "MLCL", "LMFY", "GWLH", "PWZC",
      "PVAA", "QQXJ", "NYCX", "AYWV", "KSDF", "ECQF", "EVWF", "EPHU", "DAUW", "EHVX",
      "FGYL", "WANK", "WQTC", "QNES", "PMYA", "NYEV", "ALHT", "WCGW", "FZPD", "VGZD",
      "TYRC", "FURT", "KRHU", "CSTX", "GZKL", "SEWM", "ZJXZ", "RCSV", "YSXQ", "ZFXU",
      "DFGW", "YLWB", "JGSC", "JPEV", "NJXF", "FSBR", "HRFH", "CVRH", "MKCU", "ACHA",
      "XJVT", "QCPQ", "GTUA", "QZKC", "BQRL", "KYCD", "KLKK", "FGVW", "XSFB", "BDZZ",
      "EHRW", "KPBY", "HLCM", "HPGP", "XLRZ", "XUNF", "ANLW", "PYNX", "KLCY", "QBPS",
      "MGDQ", "KDSY", "LDVF", "REGF", "DPBE", "NXZE", "CFAB", "JRMB", "TYJY", "NNYW",
      "KNEU", "BTLU", "ZPLH", "LJKF", "PWNS", "EMUE", "LUXQ", "BPTL", "MEFC", "WXJD",
      "DSKB", "YKML", "LRJG", "FTHK", "SLQN", "EGJH", "TBSL", "ESKK", "TMDS", "VDRD",
      "PKDQ", "NWQN", "HXXW", "JXPU", "YYMP", "KRAB", "SYQF", "XKZJ", "ZPPR", "GVZA",
      "LWHG", "WTPQ", "AEDU", "FJMH", "LZHD", "GMQE", "LVWH", "RBLX", "CJZT", "UCZP",
      "HHJW", "DMLF", "ZJSC", "XEGJ", "EJAN", "DVUX", "PNZT", "UMDZ", "FKTV", "CAUS"
    ];

    // Itérer sur chaque document et ajouter les données à l'array "users"
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (tableau.indexOf(data.identifiant) === -1) {
        this.users.push(data);
      }
    });
  }
}
</script>

<style>
.ticket {
  border: solid 1px lightgrey;
  padding: 15px;
}

.page-break {
  page-break-inside: avoid;
}
</style>